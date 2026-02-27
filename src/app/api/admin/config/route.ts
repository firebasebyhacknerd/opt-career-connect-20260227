import { NextRequest, NextResponse } from 'next/server'
import { createAdminAuthErrorResponse, getAdminEnvReadiness, isAdminAuthenticated } from '@/lib/admin/auth'
import { getAdminConfigPayload, updateSettings } from '@/lib/config/service'
import { type ConfigKey } from '@/lib/config/schema'

function assertAdminRequest(request: NextRequest): NextResponse | null {
  const readiness = getAdminEnvReadiness()
  if (!readiness.ready) {
    return NextResponse.json(
      {
        error: 'Admin configuration missing',
        message: 'Set ADMIN_PANEL_PASSWORD, ADMIN_SESSION_SECRET, and ADMIN_ENCRYPTION_KEY.',
        missing: readiness.missing,
      },
      { status: 503 }
    )
  }

  if (!isAdminAuthenticated(request)) {
    return createAdminAuthErrorResponse(401)
  }

  return null
}

export async function GET(request: NextRequest) {
  const authError = assertAdminRequest(request)
  if (authError) return authError

  const payload = await getAdminConfigPayload()
  return NextResponse.json({
    success: true,
    ...payload,
  })
}

export async function PUT(request: NextRequest) {
  const authError = assertAdminRequest(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const updates = (body?.updates || {}) as Partial<Record<ConfigKey, unknown>>

    const result = await updateSettings(updates, 'admin_panel')
    if (!result.storageAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: 'Settings storage unavailable',
          message: 'app_settings tables are missing or database is unreachable.',
          storageAvailable: false,
        },
        { status: 503 }
      )
    }

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          fieldErrors: result.fieldErrors,
          storageAvailable: result.storageAvailable,
        },
        { status: 400 }
      )
    }

    const payload = await getAdminConfigPayload()
    return NextResponse.json({
      success: true,
      updatedKeys: result.updatedKeys,
      ...payload,
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request', message: 'Could not parse update payload.' },
      { status: 400 }
    )
  }
}
