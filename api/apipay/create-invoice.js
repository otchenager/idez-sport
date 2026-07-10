import { apipayRequest, normalizePhone } from '../_lib/apipay.js'
import { sendTelegram } from '../_lib/telegram.js'
import { PRODUCTS } from '../../src/data/products.js'

const ERROR_MESSAGES = {
  422: 'Некорректный номер телефона.',
  400: 'Оплата временно недоступна (магазин ещё не подключён к Kaspi). Попробуйте позже.',
  401: 'Оплата временно недоступна (ошибка настройки на стороне магазина).',
  503: 'Kaspi временно недоступен. Попробуйте оформить заказ через пару минут.',
  429: 'Слишком много запросов. Попробуйте через минуту.',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { productId, name, phone, address } = req.body || {}

  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Введите ваше имя' })
    return
  }
  if (typeof address !== 'string' || !address.trim()) {
    res.status(400).json({ error: 'Введите адрес доставки' })
    return
  }

  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) {
    res.status(400).json({ error: 'Товар не найден' })
    return
  }

  const normalizedPhone = normalizePhone(phone)
  if (!normalizedPhone) {
    res.status(400).json({ error: 'Введите корректный номер телефона' })
    return
  }

  const externalOrderId = `idez-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  let invoiceRes
  try {
    invoiceRes = await apipayRequest('/invoices', {
      method: 'POST',
      body: {
        phone_number: normalizedPhone,
        amount: product.price,
        description: `iDEZ ${product.sub} — заказ ${externalOrderId}`,
        external_order_id: externalOrderId,
      },
    })
  } catch (err) {
    console.error('ApiPay request failed:', err)
    res.status(502).json({ error: 'Не удалось связаться с платёжным сервисом' })
    return
  }

  if (!invoiceRes.ok) {
    const message = invoiceRes.data?.error_message
      || ERROR_MESSAGES[invoiceRes.status]
      || 'Не удалось создать счёт на оплату'
    res.status(502).json({ error: message })
    return
  }

  const invoice = invoiceRes.data

  await sendTelegram([
    '🛒 *Новый заказ iDEZ SPORT (ожидает оплаты)*',
    `🧾 Заказ: ${externalOrderId} (invoice #${invoice.id})`,
    `📦 Товар: ${product.name}`,
    `💰 Сумма: ${product.price.toLocaleString('ru')} ₸`,
    `👤 Имя: ${name.trim()}`,
    `📞 Телефон: ${normalizedPhone}`,
    `📍 Адрес: ${address.trim()}`,
    '⏳ Ждём подтверждение оплаты в Kaspi...',
  ].join('\n'))

  res.status(200).json({
    invoiceId: invoice.id,
    externalOrderId,
    amount: product.price,
  })
}
