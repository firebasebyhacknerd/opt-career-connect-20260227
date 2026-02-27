import { NextRequest, NextResponse } from 'next/server'
import {
  createAdminAuthErrorResponse,
  getAdminEnvReadiness,
  setAdminSessionCookie,
  validateAdminPassword,
} from '@/lib/admin/auth'

export async function POST(request: NextRequest) {
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

  try {
    const body = await request.json()
    const password = String(body?.password || '')

    if (!validateAdminPassword(password)) {
      return createAdminAuthErrorResponse(401)
    }

    const response = NextResponse.json({ success: true })
    setAdminSessionCookie(response)
    return response
  } catch {
    return NextResponse.json(
      { error: 'Invalid request', message: 'Could not parse request body.' },
      { status: 400 }
    )
  }
}
