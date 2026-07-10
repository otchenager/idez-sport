export async function sendTelegram(text) {
  const token = process.env.TG_BOT_TOKEN
  const chatId = process.env.TG_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
      signal: AbortSignal.timeout(8000),
    })
  } catch (err) {
    console.error('Telegram send failed:', err)
  }
}
