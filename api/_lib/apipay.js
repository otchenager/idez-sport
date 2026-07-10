const BASE_URL = process.env.APIPAY_BASE_URL || 'https://bpapi.bazarbay.site/api/v1'

export async function apipayRequest(path, { method = 'GET', body } = {}) {
  const apiKey = process.env.APIPAY_API_KEY
  if (!apiKey) {
    throw new Error('APIPAY_API_KEY is not configured')
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  return { ok: res.ok, status: res.status, data }
}

export function normalizePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  let normalized = null

  if (digits.length === 11 && digits[0] === '7') {
    normalized = '8' + digits.slice(1)
  } else if (digits.length === 11 && digits[0] === '8') {
    normalized = digits
  } else if (digits.length === 10) {
    normalized = '8' + digits
  }

  if (normalized && /^8\d{10}$/.test(normalized)) {
    return normalized
  }
  return null
}
