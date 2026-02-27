'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  Bot,
  Database,
  Globe,
  KeyRound,
  LogOut,
  RefreshCcw,
  Save,
  ShieldCheck,
  Sparkles,
  TestTube2,
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

type Source = 'db' | 'env' | 'default'
type Section = 'ai' | 'jobs' | 'site'

interface AdminField {
  key: string
  label: string
  description: string
  section: Section
  type: string
  isSecret: boolean
  options?: string[]
  source: Source
  value: string | boolean | number | Record<string, unknown> | null
  isSet: boolean
  warning?: string
}

interface AuditItem {
  id: number
  settingKey: string
  action: string
  oldValue: string | null
  newValue: string | null
  changedAt: string
  changedBy: string
}

interface ConfigPayload {
  success: boolean
  storageAvailable: boolean
  warnings: string[]
  settings: AdminField[]
  audit: AuditItem[]
}

type FormValues = Record<string, string | boolean | number>

const sectionTitles: Record<Section, string> = {
  ai: 'AI Resume Settings',
  jobs: 'Job Search Settings',
  site: 'Site Settings',
}

function sourceBadgeClass(source: Source): string {
  if (source === 'db') return 'bg-emerald-100 text-emerald-800 border-emerald-200'
  if (source === 'env') return 'bg-sky-100 text-sky-800 border-sky-200'
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

function normalizeComparable(value: unknown): string {
  if (typeof value === 'string') return value
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)
  if (value === null || value === undefined) return ''
  return JSON.stringify(value)
}

function sectionIcon(section: Section) {
  if (section === 'ai') return Bot
  if (section === 'jobs') return Database
  return Globe
}

export default function AdminConfigConsole() {
  const [loading, setLoading] = useState(true)
  const [authRequired, setAuthRequired] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const [password, setPassword] = useState('')
  const [settings, setSettings] = useState<AdminField[]>([])
  const [audit, setAudit] = useState<AuditItem[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [formValues, setFormValues] = useState<FormValues>({})
  const [initialValues, setInitialValues] = useState<FormValues>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [testingGroq, setTestingGroq] = useState(false)
  const [saving, setSaving] = useState(false)

  const groupedSettings = useMemo(() => {
    return {
      ai: settings.filter((setting) => setting.section === 'ai'),
      jobs: settings.filter((setting) => setting.section === 'jobs'),
      site: settings.filter((setting) => setting.section === 'site'),
    }
  }, [settings])

  const hasUnsavedChanges = useMemo(() => {
    for (const setting of settings) {
      const currentValue = formValues[setting.key]
      if (setting.isSecret) {
        if (currentValue === '__CLEAR__') return true
        if (typeof currentValue === 'string' && currentValue.trim() !== '') return true
        continue
      }

      const initial = initialValues[setting.key]
      if (normalizeComparable(currentValue) !== normalizeComparable(initial)) {
        return true
      }
    }
    return false
  }, [settings, formValues, initialValues])

  async function loadConfig() {
    setLoading(true)
    setFieldErrors({})

    try {
      const response = await fetch('/api/admin/config', { cache: 'no-store' })
      if (response.status === 401) {
        setAuthRequired(true)
        setLoading(false)
        return
      }

      const payload = (await response.json()) as ConfigPayload & { message?: string }
      if (!response.ok) {
        setAuthRequired(true)
        setAuthMessage(payload.message || 'Admin configuration is missing.')
        setLoading(false)
        return
      }

      setAuthRequired(false)
      setAuthMessage('')
      setSettings(payload.settings || [])
      setAudit(payload.audit || [])
      setWarnings(payload.warnings || [])
      setStorageAvailable(payload.storageAvailable)

      const nextValues: FormValues = {}
      const nextInitial: FormValues = {}
      for (const setting of payload.settings || []) {
        if (setting.isSecret) {
          nextValues[setting.key] = ''
          nextInitial[setting.key] = ''
        } else if (typeof setting.value === 'boolean') {
          nextValues[setting.key] = setting.value
          nextInitial[setting.key] = setting.value
        } else {
          const normalized = normalizeComparable(setting.value)
          nextValues[setting.key] = normalized
          nextInitial[setting.key] = normalized
        }
      }
      setFormValues(nextValues)
      setInitialValues(nextInitial)
    } catch (error) {
      toast.error(`Failed to load admin config: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConfig()
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setFieldErrors({})
    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const payload = await response.json()
      if (!response.ok) {
        toast.error(payload.message || 'Invalid admin password.')
        return
      }
      setPassword('')
      toast.success('Admin session started.')
      await loadConfig()
    } catch (error) {
      toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    setAuthRequired(true)
    setSettings([])
    setAudit([])
    setFormValues({})
    setInitialValues({})
    toast.success('Logged out.')
  }

  function handleValueChange(key: string, value: string | boolean) {
    setFieldErrors((prev) => ({ ...prev, [key]: '' }))
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  function clearSecret(key: string) {
    setFieldErrors((prev) => ({ ...prev, [key]: '' }))
    setFormValues((prev) => ({ ...prev, [key]: '__CLEAR__' }))
  }

  function revertUnsavedChanges() {
    const reverted: FormValues = {}
    for (const setting of settings) {
      reverted[setting.key] = setting.isSecret ? '' : initialValues[setting.key]
    }
    setFieldErrors({})
    setFormValues(reverted)
    toast.success('Unsaved changes reverted.')
  }

  function buildUpdatePayload(): Record<string, unknown> {
    const updates: Record<string, unknown> = {}
    for (const setting of settings) {
      const currentValue = formValues[setting.key]
      if (setting.isSecret) {
        if (currentValue === '__CLEAR__') {
          updates[setting.key] = null
        } else if (typeof currentValue === 'string' && currentValue.trim() !== '') {
          updates[setting.key] = currentValue
        }
        continue
      }

      const initial = initialValues[setting.key]
      if (normalizeComparable(currentValue) !== normalizeComparable(initial)) {
        updates[setting.key] = currentValue
      }
    }
    return updates
  }

  async function saveAll() {
    const updates = buildUpdatePayload()
    if (Object.keys(updates).length === 0) {
      toast('No changes to save.')
      return
    }

    setSaving(true)
    setFieldErrors({})
    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })

      const payload = await response.json()
      if (!response.ok) {
        if (payload?.fieldErrors) {
          setFieldErrors(payload.fieldErrors)
        }
        toast.error(payload?.message || 'Failed to save settings.')
        return
      }

      toast.success('Settings saved.')
      await loadConfig()
    } catch (error) {
      toast.error(`Save failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  async function testGroq() {
    setTestingGroq(true)
    try {
      const overrides: Record<string, unknown> = {}
      if (typeof formValues['ai.groq.api_key'] === 'string' && formValues['ai.groq.api_key'].trim() !== '') {
        overrides['ai.groq.api_key'] = formValues['ai.groq.api_key']
      }
      if (typeof formValues['ai.groq.model'] === 'string' && formValues['ai.groq.model'].trim() !== '') {
        overrides['ai.groq.model'] = formValues['ai.groq.model']
      }

      const response = await fetch('/api/admin/config/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrides }),
      })

      const payload = await response.json()
      if (!response.ok) {
        toast.error(payload?.result?.message || payload?.message || 'Groq test failed.')
        return
      }

      toast.success(payload?.result?.message || 'Groq connection successful.')
    } catch (error) {
      toast.error(`Groq test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setTestingGroq(false)
    }
  }

  if (loading) {
    return (
      <div className="lux-panel text-center py-14">
        <Activity className="w-10 h-10 mx-auto text-primary-teal animate-pulse mb-4" />
        <p className="text-dark-gray">Loading admin config...</p>
      </div>
    )
  }

  if (authRequired) {
    return (
      <section className="max-w-xl mx-auto">
        <Toaster position="top-right" />
        <div className="lux-panel overflow-hidden p-0">
          <div className="bg-gradient-to-r from-primary-blue via-primary-teal to-secondary-orange p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                <p className="text-sm text-white/90">Runtime Config Console</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-dark-gray mb-6">
              {authMessage || 'Enter admin password to manage runtime configuration and API behavior.'}
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block">
                <span className="lux-label">Password</span>
                <input
                  type="password"
                  className="lux-input"
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button className="btn btn-primary w-full" type="submit">
                Login to Console
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      <section className="lux-panel overflow-hidden p-0">
        <div className="p-7 bg-gradient-to-br from-primary-blue/90 via-primary-teal/90 to-secondary-orange/90 text-white relative">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute right-16 bottom-0 w-20 h-20 rounded-full bg-white/10 blur-xl" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wide mb-3">
                <Sparkles className="w-3 h-3" />
                Live Runtime Control
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Admin Config Console</h1>
              <p className="text-white/90 max-w-2xl">
                Configure AI, job source logic, and SEO settings without code changes or redeploy.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-secondary" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
              <button className="btn btn-secondary" onClick={revertUnsavedChanges} disabled={!hasUnsavedChanges}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                Revert
              </button>
              <button className="btn btn-primary" onClick={saveAll} disabled={saving || !hasUnsavedChanges}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save All'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lux-panel p-5">
          <p className="text-sm text-medium-gray">Storage Layer</p>
          <p className="text-xl font-semibold text-dark-blue mt-1">
            {storageAvailable ? 'Connected' : 'Unavailable'}
          </p>
          <p className="text-sm text-medium-gray mt-2">
            {storageAvailable ? 'Settings are persisted in Postgres.' : 'Using env/default fallback only.'}
          </p>
        </div>
        <div className="lux-panel p-5">
          <p className="text-sm text-medium-gray">Managed Keys</p>
          <p className="text-xl font-semibold text-dark-blue mt-1">{settings.length}</p>
          <p className="text-sm text-medium-gray mt-2">Across AI, Jobs, and Site configuration.</p>
        </div>
        <div className="lux-panel p-5">
          <p className="text-sm text-medium-gray">Recent Change Events</p>
          <p className="text-xl font-semibold text-dark-blue mt-1">{audit.length}</p>
          <p className="text-sm text-medium-gray mt-2">Latest entries from settings audit history.</p>
        </div>
      </section>

      {!storageAvailable && (
        <div className="lux-panel border border-orange-200 bg-orange-50 p-5">
          <p className="text-orange-800 font-semibold">Settings storage unavailable.</p>
          <p className="text-orange-700 text-sm mt-1">
            Run the `app_settings` migration first, then retry save operations.
          </p>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="lux-panel border border-yellow-200 bg-yellow-50 p-5">
          {warnings.map((warning, index) => (
            <p key={index} className="text-yellow-900 text-sm">
              {warning}
            </p>
          ))}
        </div>
      )}

      <div className="lux-panel p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-dark-blue">Provider Health Check</h2>
            <p className="text-sm text-medium-gray">Validate Groq credentials and model before saving.</p>
          </div>
          <button className="btn btn-secondary" onClick={testGroq} disabled={testingGroq}>
            <TestTube2 className="w-4 h-4 mr-2" />
            {testingGroq ? 'Testing Groq...' : 'Test Groq Connection'}
          </button>
        </div>
      </div>

      {(['ai', 'jobs', 'site'] as Section[]).map((section) => {
        const Icon = sectionIcon(section)
        return (
          <section key={section} className="lux-panel space-y-5 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-blue to-primary-teal text-white flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-dark-blue">{sectionTitles[section]}</h2>
                <p className="text-sm text-medium-gray">Live values with source awareness and validation.</p>
              </div>
            </div>

            <div className="space-y-4">
              {groupedSettings[section].map((setting) => (
                <div key={setting.key} className="rounded-2xl border border-slate-200 bg-white/85 p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-dark-blue">{setting.label}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${sourceBadgeClass(setting.source)}`}>
                          {setting.source}
                        </span>
                        {setting.isSecret && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 border border-slate-200">
                            {setting.isSet ? 'set' : 'not set'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-medium-gray">{setting.description}</p>
                    </div>
                    <code className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg w-fit">
                      {setting.key}
                    </code>
                  </div>

                  {setting.options && setting.options.length > 0 ? (
                    <select
                      className="lux-input"
                      value={String(formValues[setting.key] ?? '')}
                      onChange={(e) => handleValueChange(setting.key, e.target.value)}
                    >
                      {setting.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : setting.type === 'boolean' ? (
                    <label className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
                      <input
                        type="checkbox"
                        checked={Boolean(formValues[setting.key])}
                        onChange={(e) => handleValueChange(setting.key, e.target.checked)}
                      />
                      <span className="text-sm font-medium text-dark-gray">
                        {Boolean(formValues[setting.key]) ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  ) : setting.isSecret ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <KeyRound className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                        <input
                          type="password"
                          className="lux-input pl-9"
                          placeholder={setting.isSet ? 'Enter new key to replace current secret' : 'Enter API key'}
                          value={String(formValues[setting.key] ?? '') === '__CLEAR__' ? '' : String(formValues[setting.key] ?? '')}
                          onChange={(e) => handleValueChange(setting.key, e.target.value)}
                        />
                      </div>
                      <button type="button" className="btn btn-secondary" onClick={() => clearSecret(setting.key)}>
                        Clear
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="lux-input"
                      value={String(formValues[setting.key] ?? '')}
                      onChange={(e) => handleValueChange(setting.key, e.target.value)}
                    />
                  )}

                  {fieldErrors[setting.key] && (
                    <p className="text-sm text-red-600 mt-2">{fieldErrors[setting.key]}</p>
                  )}
                  {setting.warning && (
                    <p className="text-sm text-orange-700 mt-2">{setting.warning}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )
      })}

      <section className="lux-panel space-y-4 p-6">
        <h2 className="text-xl font-bold text-dark-blue">Recent Changes</h2>
        {audit.length === 0 ? (
          <p className="text-medium-gray text-sm">No settings changes recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="py-2 pr-3">When</th>
                  <th className="py-2 pr-3">Key</th>
                  <th className="py-2 pr-3">Action</th>
                  <th className="py-2 pr-3">Old</th>
                  <th className="py-2 pr-3">New</th>
                  <th className="py-2">By</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-2 pr-3 text-medium-gray">{new Date(item.changedAt).toLocaleString()}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{item.settingKey}</td>
                    <td className="py-2 pr-3">{item.action}</td>
                    <td className="py-2 pr-3">{item.oldValue || '-'}</td>
                    <td className="py-2 pr-3">{item.newValue || '-'}</td>
                    <td className="py-2">{item.changedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
