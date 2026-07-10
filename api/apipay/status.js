import { apipayRequest } from '../_lib/apipay.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { id } = req.query
  if (!id || !/^\d+$/.test(String(id))) {
    res.status(400).json({ error: 'Некорректный идентификатор счёта' })
    return
  }

  let invoiceRes
  try {
    invoiceRes = await apipayRequest(`/invoices/${id}`)
  } catch (err) {
    console.error('ApiPay status request failed:', err)
    res.status(502).json({ error: 'Не удалось получить статус оплаты' })
    return
  }

  if (!invoiceRes.ok) {
    res.status(502).json({ error: 'Не удалось получить статус оплаты' })
    return
  }

  res.status(200).json({
    status: invoiceRes.data.status,
    paidAt: invoiceRes.data.paid_at,
  })
}
