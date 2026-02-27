import { sql } from '@vercel/postgres'
import { brand } from '@/lib/brand'
import { decryptSecret, encryptSecret, isEncryptionConfigured } from './crypto'
import {
  CONFIG_DEFINITIONS,
  CONFIG_KEYS,
  type ConfigDefinition,
  type ConfigKey,
  type ConfigSection,
  type ConfigSource,
  parseAndValidateValue,
  parseValueFromStorage,
  redactDisplayValue,
  serializeValueForStorage,
  getEnvValue,
} from './schema'

type PrimitiveConfigValue = string | boolean | number | Record<string, unknown> | null

interface AppSettingRow {
  key: string
  value_text: string | null
  value_encrypted: string | null
  value_type: string
  is_secret: boolean
  updated_at: string
  updated_by: string
}

interface AuditRow {
  id: number
  setting_key: string
  action: string
  old_value_redacted: string | null
  new_value_redacted: string | null
  changed_at: string
  changed_by: string
}

export interface ResolvedSetting {
  key: ConfigKey
  definition: ConfigDefinition
  source: ConfigSource
  value: PrimitiveConfigValue
  isSet: boolean
  warning?: string
}

type ResolvedSettingsMap = Record<ConfigKey, ResolvedSetting>

interface ResolvedSettingsCache {
  expiresAt: number
  value: ResolvedSettingsMap
}

interface TableStatusCache {
  checkedAt: number
  available: boolean
}

export interface RuntimeConfig {
  ai: {
    provider: 'groq' | 'fallback'
    groqApiKey: string
    groqModel: string
    fallbackEnabled: boolean
  }
  jobs: {
    sourceMode: 'auto' | 'database' | 'fallback'
    fallbackEnabled: boolean
    advancedMatchingEnabled: boolean
  }
  site: {
    baseUrl: string
    googleVerification: string
  }
}

export interface AdminConfigField {
  key: ConfigKey
  label: string
  description: string
  section: ConfigSection
  type: string
  isSecret: boolean
  options?: string[]
  source: ConfigSource
  value: PrimitiveConfigValue
  isSet: boolean
  warning?: string
}

export interface AdminConfigAuditItem {
  id: number
  settingKey: string
  action: string
  oldValue: string | null
  newValue: string | null
  changedAt: string
  changedBy: string
}

export interface AdminConfigPayload {
  storageAvailable: boolean
  warnings: string[]
  settings: AdminConfigField[]
  audit: AdminConfigAuditItem[]
}

export interface UpdateSettingsResult {
  success: boolean
  updatedKeys: ConfigKey[]
  fieldErrors: Partial<Record<ConfigKey, string>>
  storageAvailable: boolean
}

const CACHE_TTL_MS = 60_000

let settingsCache: ResolvedSettingsCache | null = null
let tableStatusCache: TableStatusCache | null = null

function now(): number {
  return Date.now()
}

function hydratePostgresEnv(): void {
  if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
    process.env.POSTGRES_URL = process.env.DATABASE_URL
  }
}

function hasPostgresConnection(): boolean {
  hydratePostgresEnv()
  return Boolean(process.env.POSTGRES_URL)
}

async function hasSettingsTables(): Promise<boolean> {
  const cache = tableStatusCache
  if (cache && cache.checkedAt + CACHE_TTL_MS > now()) {
    return cache.available
  }

  if (!hasPostgresConnection()) {
    tableStatusCache = { checkedAt: now(), available: false }
    return false
  }

  try {
    const result = await sql.query<{ app_settings: string | null; app_settings_audit: string | null }>(
      `
        SELECT
          to_regclass('public.app_settings')::text AS app_settings,
          to_regclass('public.app_settings_audit')::text AS app_settings_audit
      `
    )

    const row = result.rows[0]
    const available = Boolean(row?.app_settings) && Boolean(row?.app_settings_audit)
    tableStatusCache = { checkedAt: now(), available }
    return available
  } catch {
    tableStatusCache = { checkedAt: now(), available: false }
    return false
  }
}

function getFallbackValue(definition: ConfigDefinition): { value: PrimitiveConfigValue; source: ConfigSource } {
  const envRaw = getEnvValue(definition)
  if (envRaw !== undefined) {
    const parsed = parseAndValidateValue(definition.key, envRaw)
    if (parsed.ok) {
      return {
        value: parsed.value as PrimitiveConfigValue,
        source: 'env',
      }
    }
  }

  return {
    value: definition.defaultValue as PrimitiveConfigValue,
    source: 'default',
  }
}

function buildFallbackMap(): ResolvedSettingsMap {
  const entries = CONFIG_KEYS.map((key) => {
    const definition = CONFIG_DEFINITIONS[key]
    const fallback = getFallbackValue(definition)
    return [
      key,
      {
        key,
        definition,
        source: fallback.source,
        value: fallback.value,
        isSet: fallback.value !== null && fallback.value !== '',
      } satisfies ResolvedSetting,
    ]
  }) as Array<[ConfigKey, ResolvedSetting]>

  return Object.fromEntries(entries) as ResolvedSettingsMap
}

async function loadRows(keys: ConfigKey[]): Promise<AppSettingRow[]> {
  if (!(await hasSettingsTables())) return []

  const result = await sql.query<AppSettingRow>(
    `
      SELECT key, value_text, value_encrypted, value_type, is_secret, updated_at::text, updated_by
      FROM app_settings
      WHERE key = ANY($1::text[])
    `,
    [keys]
  )

  return result.rows
}

function applyDbRow(
  current: ResolvedSetting,
  row: AppSettingRow
): ResolvedSetting {
  const { definition } = current
  if (definition.isSecret) {
    try {
      let plainText: string | null = null
      if (row.value_encrypted) {
        if (!isEncryptionConfigured()) {
          return { ...current, warning: 'Secret is encrypted but ADMIN_ENCRYPTION_KEY is missing.' }
        }
        plainText = decryptSecret(row.value_encrypted)
      } else if (row.value_text) {
        plainText = row.value_text
      }

      if (plainText === null) {
        return {
          ...current,
          source: 'db',
          value: '',
          isSet: false,
        }
      }

      const parsed = parseAndValidateValue(definition.key, plainText)
      if (!parsed.ok) {
        return { ...current, warning: `Invalid stored value for ${definition.key}.` }
      }

      return {
        ...current,
        source: 'db',
        value: parsed.value as PrimitiveConfigValue,
        isSet: plainText !== '',
      }
    } catch {
      return { ...current, warning: `Could not decrypt secret for ${definition.key}.` }
    }
  }

  const parsedStored = parseValueFromStorage(definition, row.value_text)
  const parsed = parseAndValidateValue(definition.key, parsedStored)
  if (!parsed.ok) {
    return { ...current, warning: `Invalid stored value for ${definition.key}.` }
  }

  return {
    ...current,
    source: 'db',
    value: parsed.value as PrimitiveConfigValue,
    isSet: parsed.value !== null && parsed.value !== '',
  }
}

export function invalidateConfigCache(): void {
  settingsCache = null
}

export async function getResolvedSettings(forceRefresh = false): Promise<ResolvedSettingsMap> {
  if (!forceRefresh && settingsCache && settingsCache.expiresAt > now()) {
    return settingsCache.value
  }

  const resolved = buildFallbackMap()

  try {
    const rows = await loadRows(CONFIG_KEYS)
    for (const row of rows) {
      if (!CONFIG_KEYS.includes(row.key as ConfigKey)) continue
      const key = row.key as ConfigKey
      resolved[key] = applyDbRow(resolved[key], row)
    }
  } catch {
    // Keep fallback map if storage is unavailable.
  }

  settingsCache = {
    value: resolved,
    expiresAt: now() + CACHE_TTL_MS,
  }

  return resolved
}

export async function getRuntimeConfig(forceRefresh = false): Promise<RuntimeConfig> {
  const resolved = await getResolvedSettings(forceRefresh)

  const aiProvider = (resolved['ai.provider'].value as string) || 'groq'
  const jobsSourceMode = (resolved['jobs.source_mode'].value as string) || 'auto'

  return {
    ai: {
      provider: aiProvider === 'fallback' ? 'fallback' : 'groq',
      groqApiKey: String(resolved['ai.groq.api_key'].value || ''),
      groqModel: String(resolved['ai.groq.model'].value || 'mixtral-8x7b-32768'),
      fallbackEnabled: Boolean(resolved['ai.fallback.enabled'].value),
    },
    jobs: {
      sourceMode: jobsSourceMode === 'database' || jobsSourceMode === 'fallback' ? jobsSourceMode : 'auto',
      fallbackEnabled: Boolean(resolved['jobs.fallback.enabled'].value),
      advancedMatchingEnabled: Boolean(resolved['jobs.advanced_matching.enabled'].value),
    },
    site: {
      baseUrl: String(resolved['site.base_url'].value || brand.website),
      googleVerification: String(resolved['site.google_verification'].value || ''),
    },
  }
}

export async function seedDefaultsIfMissing(updatedBy = 'admin_panel'): Promise<void> {
  if (!(await hasSettingsTables())) return

  const existing = await sql.query<{ key: string }>('SELECT key FROM app_settings WHERE key = ANY($1::text[])', [CONFIG_KEYS])
  const existingKeys = new Set(existing.rows.map((row) => row.key))

  for (const key of CONFIG_KEYS) {
    const definition = CONFIG_DEFINITIONS[key]
    if (definition.isSecret) continue
    if (existingKeys.has(key)) continue

    const fallback = getFallbackValue(definition)
    const serialized = serializeValueForStorage(
      definition,
      fallback.value as string | boolean | number | Record<string, unknown>
    )

    await sql.query(
      `
        INSERT INTO app_settings (
          key, value_text, value_encrypted, value_type, is_secret, updated_at, updated_by
        )
        VALUES ($1, $2, NULL, $3, FALSE, NOW(), $4)
        ON CONFLICT (key) DO NOTHING
      `,
      [key, serialized, definition.type, updatedBy]
    )

    await sql.query(
      `
        INSERT INTO app_settings_audit (
          setting_key, action, old_value_redacted, new_value_redacted, changed_at, changed_by
        )
        VALUES ($1, 'create', NULL, $2, NOW(), $3)
      `,
      [key, redactDisplayValue(fallback.value, false), updatedBy]
    )
  }

  invalidateConfigCache()
}

async function getAudit(limit = 20): Promise<AdminConfigAuditItem[]> {
  if (!(await hasSettingsTables())) return []

  const safeLimit = Math.max(1, Math.min(100, limit))
  const result = await sql.query<AuditRow>(
    `
      SELECT id, setting_key, action, old_value_redacted, new_value_redacted, changed_at::text, changed_by
      FROM app_settings_audit
      ORDER BY changed_at DESC
      LIMIT $1
    `,
    [safeLimit]
  )

  return result.rows.map((row) => ({
    id: row.id,
    settingKey: row.setting_key,
    action: row.action,
    oldValue: row.old_value_redacted,
    newValue: row.new_value_redacted,
    changedAt: row.changed_at,
    changedBy: row.changed_by,
  }))
}

export async function getAdminConfigPayload(): Promise<AdminConfigPayload> {
  const storageAvailable = await hasSettingsTables()
  if (storageAvailable) {
    await seedDefaultsIfMissing('admin_panel')
  }

  const settings = await getResolvedSettings()
  const audit = await getAudit(20)

  const warnings: string[] = []
  if (!storageAvailable) {
    warnings.push('Settings storage is unavailable. Using env/default values only.')
  }

  const fields = CONFIG_KEYS.map((key) => {
    const setting = settings[key]
    const valueForUi = setting.definition.isSecret ? '' : setting.value
    return {
      key: setting.key,
      label: setting.definition.label,
      description: setting.definition.description,
      section: setting.definition.section,
      type: setting.definition.type,
      isSecret: setting.definition.isSecret,
      options: setting.definition.options,
      source: setting.source,
      value: valueForUi,
      isSet: setting.isSet,
      warning: setting.warning,
    } satisfies AdminConfigField
  })

  return {
    storageAvailable,
    warnings,
    settings: fields,
    audit,
  }
}

function normalizeUpdateInput(raw: unknown): { isClear: boolean; value: unknown } {
  if (raw === null) return { isClear: true, value: null }
  if (typeof raw === 'string' && raw === '__CLEAR__') return { isClear: true, value: null }
  return { isClear: false, value: raw }
}

async function loadCurrentRows(keys: ConfigKey[]): Promise<Record<ConfigKey, AppSettingRow | undefined>> {
  if (!(await hasSettingsTables())) {
    return {} as Record<ConfigKey, AppSettingRow | undefined>
  }

  const result = await sql.query<AppSettingRow>(
    `
      SELECT key, value_text, value_encrypted, value_type, is_secret, updated_at::text, updated_by
      FROM app_settings
      WHERE key = ANY($1::text[])
    `,
    [keys]
  )

  const map = {} as Record<ConfigKey, AppSettingRow | undefined>
  for (const row of result.rows) {
    if (CONFIG_KEYS.includes(row.key as ConfigKey)) {
      map[row.key as ConfigKey] = row
    }
  }
  return map
}

export async function updateSettings(
  updates: Partial<Record<ConfigKey, unknown>>,
  updatedBy = 'admin_panel'
): Promise<UpdateSettingsResult> {
  const storageAvailable = await hasSettingsTables()
  if (!storageAvailable) {
    return {
      success: false,
      updatedKeys: [],
      fieldErrors: {},
      storageAvailable: false,
    }
  }

  const fieldErrors: Partial<Record<ConfigKey, string>> = {}
  const prepared: Array<{
    key: ConfigKey
    definition: ConfigDefinition
    isClear: boolean
    parsedValue: PrimitiveConfigValue
  }> = []

  for (const key of Object.keys(updates) as ConfigKey[]) {
    if (!CONFIG_KEYS.includes(key)) {
      continue
    }

    const definition = CONFIG_DEFINITIONS[key]
    const normalized = normalizeUpdateInput(updates[key])

    if (definition.isSecret && normalized.isClear) {
      prepared.push({
        key,
        definition,
        isClear: true,
        parsedValue: null,
      })
      continue
    }

    const parsed = parseAndValidateValue(key, normalized.value)
    if (!parsed.ok) {
      fieldErrors[key] = parsed.error || 'Invalid value.'
      continue
    }

    prepared.push({
      key,
      definition,
      isClear: false,
      parsedValue: parsed.value as PrimitiveConfigValue,
    })
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      updatedKeys: [],
      fieldErrors,
      storageAvailable,
    }
  }

  const currentRows = await loadCurrentRows(prepared.map((item) => item.key))
  const updatedKeys: ConfigKey[] = []

  for (const item of prepared) {
    const currentRow = currentRows[item.key]
    const action: 'create' | 'update' | 'delete' =
      !currentRow ? 'create' : item.isClear ? 'delete' : 'update'

    let valueText: string | null = null
    let valueEncrypted: string | null = null
    if (!item.isClear && item.parsedValue !== null) {
      if (item.definition.isSecret) {
        if (!isEncryptionConfigured()) {
          fieldErrors[item.key] = 'Missing ADMIN_ENCRYPTION_KEY. Cannot save secret.'
          continue
        }
        valueEncrypted = encryptSecret(String(item.parsedValue))
      } else {
        valueText = serializeValueForStorage(
          item.definition,
          item.parsedValue as string | boolean | number | Record<string, unknown>
        )
      }
    }

    await sql.query(
      `
        INSERT INTO app_settings (
          key, value_text, value_encrypted, value_type, is_secret, updated_at, updated_by
        )
        VALUES ($1, $2, $3, $4, $5, NOW(), $6)
        ON CONFLICT (key) DO UPDATE
        SET
          value_text = EXCLUDED.value_text,
          value_encrypted = EXCLUDED.value_encrypted,
          value_type = EXCLUDED.value_type,
          is_secret = EXCLUDED.is_secret,
          updated_at = NOW(),
          updated_by = EXCLUDED.updated_by
      `,
      [item.key, valueText, valueEncrypted, item.definition.type, item.definition.isSecret, updatedBy]
    )

    const oldRedacted = currentRow
      ? redactDisplayValue(
          item.definition.isSecret
            ? currentRow.value_encrypted || currentRow.value_text || ''
            : currentRow.value_text,
          item.definition.isSecret
        )
      : null

    const newRedacted = item.isClear
      ? '[empty]'
      : redactDisplayValue(item.parsedValue, item.definition.isSecret)

    await sql.query(
      `
        INSERT INTO app_settings_audit (
          setting_key, action, old_value_redacted, new_value_redacted, changed_at, changed_by
        )
        VALUES ($1, $2, $3, $4, NOW(), $5)
      `,
      [item.key, action, oldRedacted, newRedacted, updatedBy]
    )

    updatedKeys.push(item.key)
  }

  invalidateConfigCache()

  return {
    success: Object.keys(fieldErrors).length === 0,
    updatedKeys,
    fieldErrors,
    storageAvailable,
  }
}

export interface GroqTestResult {
  success: boolean
  message: string
  status?: number
  latencyMs?: number
  model?: string
}

export async function testGroqConnection(
  overrides: Partial<Record<ConfigKey, unknown>> = {}
): Promise<GroqTestResult> {
  const runtime = await getRuntimeConfig()
  let apiKey = runtime.ai.groqApiKey
  let model = runtime.ai.groqModel

  if (overrides['ai.groq.api_key'] !== undefined && overrides['ai.groq.api_key'] !== null) {
    apiKey = String(overrides['ai.groq.api_key'])
  }
  if (overrides['ai.groq.model'] !== undefined && overrides['ai.groq.model'] !== null) {
    model = String(overrides['ai.groq.model'])
  }

  if (!apiKey) {
    return {
      success: false,
      message: 'Groq API key is missing.',
    }
  }

  const startedAt = now()
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Respond with exactly: ok' }],
        max_tokens: 10,
        temperature: 0,
      }),
    })

    const latencyMs = now() - startedAt
    if (!response.ok) {
      let message = `Groq request failed with status ${response.status}.`
      try {
        const payload = await response.json()
        message = String(payload?.error?.message || message)
      } catch {
        // Ignore parse errors and keep fallback message.
      }

      return {
        success: false,
        status: response.status,
        message,
        latencyMs,
        model,
      }
    }

    return {
      success: true,
      status: response.status,
      latencyMs,
      model,
      message: 'Groq connection successful.',
    }
  } catch (error) {
    return {
      success: false,
      message: `Groq connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
