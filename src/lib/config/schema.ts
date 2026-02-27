import { brand } from '@/lib/brand'

export type ConfigValueType = 'string' | 'boolean' | 'number' | 'json' | 'secret'
export type ConfigSection = 'ai' | 'jobs' | 'site'
export type ConfigSource = 'db' | 'env' | 'default'

export type ConfigKey =
  | 'ai.provider'
  | 'ai.groq.api_key'
  | 'ai.groq.model'
  | 'ai.fallback.enabled'
  | 'jobs.source_mode'
  | 'jobs.fallback.enabled'
  | 'jobs.advanced_matching.enabled'
  | 'site.base_url'
  | 'site.google_verification'

type ConfigDefaultValue = string | boolean | number | Record<string, unknown>
type EnumOption = string

export interface ConfigDefinition {
  key: ConfigKey
  label: string
  description: string
  section: ConfigSection
  type: ConfigValueType
  isSecret: boolean
  envFallbacks: string[]
  defaultValue: ConfigDefaultValue
  options?: EnumOption[]
}

export interface ParsedValueResult {
  ok: boolean
  value?: string | boolean | number | Record<string, unknown>
  error?: string
}

export const CONFIG_DEFINITIONS: Record<ConfigKey, ConfigDefinition> = {
  'ai.provider': {
    key: 'ai.provider',
    label: 'AI Provider',
    description: 'Choose whether resume analysis uses Groq or fallback scoring.',
    section: 'ai',
    type: 'string',
    isSecret: false,
    envFallbacks: ['AI_PROVIDER'],
    defaultValue: 'groq',
    options: ['groq', 'fallback'],
  },
  'ai.groq.api_key': {
    key: 'ai.groq.api_key',
    label: 'Groq API Key',
    description: 'Secret key used for Groq chat completions.',
    section: 'ai',
    type: 'secret',
    isSecret: true,
    envFallbacks: ['GROQ_API_KEY'],
    defaultValue: '',
  },
  'ai.groq.model': {
    key: 'ai.groq.model',
    label: 'Groq Model',
    description: 'Model used for resume analysis prompts.',
    section: 'ai',
    type: 'string',
    isSecret: false,
    envFallbacks: ['GROQ_MODEL'],
    defaultValue: 'mixtral-8x7b-32768',
  },
  'ai.fallback.enabled': {
    key: 'ai.fallback.enabled',
    label: 'AI Fallback Enabled',
    description: 'Allow local heuristic scoring when Groq fails or is disabled.',
    section: 'ai',
    type: 'boolean',
    isSecret: false,
    envFallbacks: ['AI_FALLBACK_ENABLED'],
    defaultValue: true,
  },
  'jobs.source_mode': {
    key: 'jobs.source_mode',
    label: 'Jobs Source Mode',
    description: 'How job search chooses DB or local fallback data.',
    section: 'jobs',
    type: 'string',
    isSecret: false,
    envFallbacks: ['JOBS_SOURCE_MODE'],
    defaultValue: 'auto',
    options: ['auto', 'database', 'fallback'],
  },
  'jobs.fallback.enabled': {
    key: 'jobs.fallback.enabled',
    label: 'Jobs Fallback Enabled',
    description: 'Allow fallback jobs dataset when database is unavailable.',
    section: 'jobs',
    type: 'boolean',
    isSecret: false,
    envFallbacks: ['JOBS_FALLBACK_ENABLED'],
    defaultValue: true,
  },
  'jobs.advanced_matching.enabled': {
    key: 'jobs.advanced_matching.enabled',
    label: 'Advanced Matching Enabled',
    description: 'Enable resume-driven score boosting in advanced job search.',
    section: 'jobs',
    type: 'boolean',
    isSecret: false,
    envFallbacks: ['JOBS_ADVANCED_MATCHING_ENABLED'],
    defaultValue: true,
  },
  'site.base_url': {
    key: 'site.base_url',
    label: 'Site Base URL',
    description: 'Canonical URL used for metadataBase and social tags.',
    section: 'site',
    type: 'string',
    isSecret: false,
    envFallbacks: ['NEXT_PUBLIC_SITE_URL'],
    defaultValue: brand.website,
  },
  'site.google_verification': {
    key: 'site.google_verification',
    label: 'Google Site Verification',
    description: 'Value for Search Console verification meta tag.',
    section: 'site',
    type: 'string',
    isSecret: false,
    envFallbacks: ['GOOGLE_SITE_VERIFICATION'],
    defaultValue: '',
  },
}

export const CONFIG_KEYS = Object.keys(CONFIG_DEFINITIONS) as ConfigKey[]

function parseBoolean(raw: unknown): ParsedValueResult {
  if (typeof raw === 'boolean') return { ok: true, value: raw }
  if (typeof raw === 'string') {
    const normalized = raw.trim().toLowerCase()
    if (normalized === 'true') return { ok: true, value: true }
    if (normalized === 'false') return { ok: true, value: false }
  }
  return { ok: false, error: 'Expected boolean value (true/false).' }
}

function parseString(raw: unknown): ParsedValueResult {
  if (typeof raw === 'string') {
    return { ok: true, value: raw.trim() }
  }
  if (raw === null || raw === undefined) {
    return { ok: true, value: '' }
  }
  return { ok: false, error: 'Expected string value.' }
}

export function parseAndValidateValue(key: ConfigKey, rawValue: unknown): ParsedValueResult {
  const definition = CONFIG_DEFINITIONS[key]
  if (!definition) {
    return { ok: false, error: 'Unknown setting key.' }
  }

  let parsed: ParsedValueResult
  if (definition.type === 'boolean') {
    parsed = parseBoolean(rawValue)
  } else if (definition.type === 'number') {
    if (typeof rawValue === 'number' && Number.isFinite(rawValue)) {
      parsed = { ok: true, value: rawValue }
    } else if (typeof rawValue === 'string' && rawValue.trim() !== '' && !Number.isNaN(Number(rawValue))) {
      parsed = { ok: true, value: Number(rawValue) }
    } else {
      parsed = { ok: false, error: 'Expected numeric value.' }
    }
  } else if (definition.type === 'json') {
    if (rawValue !== null && typeof rawValue === 'object') {
      parsed = { ok: true, value: rawValue as Record<string, unknown> }
    } else if (typeof rawValue === 'string') {
      try {
        parsed = { ok: true, value: JSON.parse(rawValue) as Record<string, unknown> }
      } catch {
        parsed = { ok: false, error: 'Invalid JSON value.' }
      }
    } else {
      parsed = { ok: false, error: 'Expected JSON object.' }
    }
  } else {
    parsed = parseString(rawValue)
  }

  if (!parsed.ok) return parsed

  if ((definition.type === 'string' || definition.type === 'secret') && typeof parsed.value === 'string') {
    if (definition.options && !definition.options.includes(parsed.value)) {
      return {
        ok: false,
        error: `Expected one of: ${definition.options.join(', ')}`,
      }
    }

    if (key === 'site.base_url' && parsed.value) {
      try {
        const url = new URL(parsed.value)
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          return { ok: false, error: 'site.base_url must use http or https.' }
        }
      } catch {
        return { ok: false, error: 'site.base_url must be a valid URL.' }
      }
    }
  }

  return parsed
}

export function parseValueFromStorage(
  definition: ConfigDefinition,
  valueText: string | null
): string | boolean | number | Record<string, unknown> | null {
  if (valueText === null) return null

  if (definition.type === 'boolean') {
    return valueText === 'true'
  }
  if (definition.type === 'number') {
    const parsed = Number(valueText)
    return Number.isFinite(parsed) ? parsed : null
  }
  if (definition.type === 'json') {
    try {
      return JSON.parse(valueText) as Record<string, unknown>
    } catch {
      return null
    }
  }
  return valueText
}

export function serializeValueForStorage(
  definition: ConfigDefinition,
  value: string | boolean | number | Record<string, unknown>
): string {
  if (definition.type === 'json') {
    return JSON.stringify(value)
  }
  if (definition.type === 'boolean') {
    return String(Boolean(value))
  }
  return String(value)
}

export function getEnvValue(definition: ConfigDefinition): string | undefined {
  for (const envKey of definition.envFallbacks) {
    const envValue = process.env[envKey]
    if (envValue !== undefined && envValue !== null && envValue !== '') {
      return envValue
    }
  }
  return undefined
}

export function getDefaultValue(key: ConfigKey): string | boolean | number | Record<string, unknown> {
  return CONFIG_DEFINITIONS[key].defaultValue
}

export function redactDisplayValue(value: unknown, isSecret: boolean): string {
  if (isSecret) {
    if (value === null || value === undefined || value === '') return '[empty]'
    return '[set]'
  }
  if (value === null || value === undefined) return '[empty]'
  const asString = typeof value === 'string' ? value : JSON.stringify(value)
  return asString.length > 160 ? `${asString.slice(0, 157)}...` : asString
}
