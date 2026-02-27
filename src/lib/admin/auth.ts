import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_SESSION_COOKIE = 'occ_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 12 // 12 hours

interface SessionPayload {
  exp: number
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url')
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8')
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error('Missing ADMIN_SESSION_SECRET.')
  }
  return secret
}

function sign(payloadPart: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payloadPart).digest('base64url')
}

function timingSafeEqualsString(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a, 'utf8').digest()
  const hashB = crypto.createHash('sha256').update(b, 'utf8').digest()
  return crypto.timingSafeEqual(hashA, hashB)
}

export function getAdminEnvReadiness(): { ready: boolean; missing: string[] } {
  const required = ['ADMIN_PANEL_PASSWORD', 'ADMIN_SESSION_SECRET', 'ADMIN_ENCRYPTION_KEY'] as const
  const missing = required.filter((key) => !process.env[key] || process.env[key]?.trim() === '')
  return {
    ready: missing.length === 0,
    missing,
  }
}

export function createAdminSessionToken(): string {
  const secret = getSessionSecret()
  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  }
  const payloadPart = base64UrlEncode(JSON.stringify(payload))
  const signaturePart = sign(payloadPart, secret)
  return `${payloadPart}.${signaturePart}`
}

export function verifyAdminSessionToken(token: string): boolean {
  const secret = getSessionSecret()
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [payloadPart, signaturePart] = parts
  const expectedSignature = sign(payloadPart, secret)
  if (!timingSafeEqualsString(signaturePart, expectedSignature)) {
    return false
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadPart)) as SessionPayload
    const now = Math.floor(Date.now() / 1000)
    return payload.exp > now
  } catch {
    return false
  }
}

export function setAdminSessionCookie(response: NextResponse): void {
  const token = createAdminSessionToken()
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  })
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) return false

  try {
    return verifyAdminSessionToken(token)
  } catch {
    return false
  }
}

export function validateAdminPassword(inputPassword: string): boolean {
  const expected = process.env.ADMIN_PANEL_PASSWORD || ''
  if (!expected || !inputPassword) return false
  return timingSafeEqualsString(expected, inputPassword)
}

export function createAdminAuthErrorResponse(status = 401): NextResponse {
  return NextResponse.json(
    {
      error: status === 401 ? 'Unauthorized' : 'Admin configuration missing',
      message: status === 401
        ? 'Admin authentication required.'
        : 'ADMIN_* environment variables are not fully configured.',
    },
    { status }
  )
}
