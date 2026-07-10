import crypto from 'node:crypto'

export function verifyWebhookSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false

  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex')

  const expectedBuf = Buffer.from(expected)
  const actualBuf = Buffer.from(signatureHeader)
  if (expectedBuf.length !== actualBuf.length) return false

  return crypto.timingSafeEqual(expectedBuf, actualBuf)
}

export function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}
