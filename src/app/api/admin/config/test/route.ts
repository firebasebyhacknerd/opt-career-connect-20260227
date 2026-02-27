import { NextRequest, NextResponse } from 'next/server'
import { createAdminAuthErrorResponse, getAdminEnvReadiness, isAdminAuthenticated } from '@/lib/admin/auth'
import { testGroqConnection } from '@/lib/config/service'
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

export async function POST(request: NextRequest) {
  const authError = assertAdminRequest(request)
  if (authError) return authError

  try {
    const body = await request.json().catch(() => ({}))
    const overrides = (body?.overrides || {}) as Partial<Record<ConfigKey, unknown>>

    const result = await testGroqConnection(overrides)
    return NextResponse.json(
      { success: result.success, result },
      { status: result.success ? 200 : 400 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to run config test.' },
      { status: 500 }
    )
  }
}
