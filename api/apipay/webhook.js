import { verifyWebhookSignature, readRawBody } from '../_lib/verify-signature.js'
import { sendTelegram } from '../_lib/telegram.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

// Best-effort in-process dedupe. Survives repeated retries within one warm
// lambda instance; a cold start or a different instance may re-send a
// notification, which is an acceptable trade-off without a database.
const seenEvents = new Map()
const DEDUPE_TTL_MS = 60 * 60 * 1000

function alreadyHandled(key) {
  const now = Date.now()
  for (const [k, ts] of seenEvents) {
    if (now - ts > DEDUPE_TTL_MS) seenEvents.delete(k)
  }
  if (seenEvents.has(key)) return true
  seenEvents.set(key, now)
  return false
}

const STATUS_MESSAGES = {
  paid: '✅ Оплачен',
  cancelled: '❌ Отменён',
  expired: '⌛ Истёк (не оплачен вовремя)',
  error: '⚠️ Ошибка оплаты',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const rawBody = await readRawBody(req)
  const signature = req.headers['x-webhook-signature']
  const secret = process.env.APIPAY_WEBHOOK_SECRET

  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    res.status(401).json({ error: 'Invalid signature' })
    return
  }

  let payload
  try {
    payload = JSON.parse(rawBody.toString('utf8'))
  } catch {
    res.status(400).json({ error: 'Invalid JSON' })
    return
  }

  if (payload.event === 'invoice.status_changed' && payload.invoice) {
    const { id, external_order_id, amount, status } = payload.invoice
    const dedupeKey = `invoice:${id}:${status}`

    res.status(200).json({ received: true })

    if (!alreadyHandled(dedupeKey) && STATUS_MESSAGES[status]) {
      sendTelegram([
        `${STATUS_MESSAGES[status]} — заказ ${external_order_id || ''} (invoice #${id})`,
        `Сумма: ${Number(amount).toLocaleString('ru')} ₸`,
      ].join('\n')).catch(err => console.error('telegram send failed:', err))
    }
  }


}
