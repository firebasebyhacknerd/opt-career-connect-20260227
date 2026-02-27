import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'

function getEncryptionMaterial(): { key: Buffer } {
  const secret = process.env.ADMIN_ENCRYPTION_KEY
  if (!secret) {
    throw new Error('Missing ADMIN_ENCRYPTION_KEY for secret encryption.')
  }

  const key = crypto.createHash('sha256').update(secret, 'utf8').digest()
  return { key }
}

export function isEncryptionConfigured(): boolean {
  return Boolean(process.env.ADMIN_ENCRYPTION_KEY)
}

export function encryptSecret(plainText: string): string {
  const { key } = getEncryptionMaterial()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted.toString('base64')}`
}

export function decryptSecret(encoded: string): string {
  const { key } = getEncryptionMaterial()
  const parts = encoded.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted secret format.')
  }

  const [ivB64, tagB64, cipherB64] = parts
  const iv = Buffer.from(ivB64, 'base64')
  const tag = Buffer.from(tagB64, 'base64')
  const encrypted = Buffer.from(cipherB64, 'base64')

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return decrypted.toString('utf8')
}
