import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = 'https://mundial-2026-prode-tawny.vercel.app'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { type, data } = req.body

    if (type !== 'payment' || !data?.id) {
      return res.status(200).json({ received: true })
    }

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    })

    if (!mpRes.ok) {
      console.error('MP API error:', await mpRes.text())
      return res.status(200).json({ received: true })
    }

    const payment = await mpRes.json()

    if (payment.status !== 'approved') {
      return res.status(200).json({ received: true })
    }

    const buyerEmail = payment.payer?.email
    const buyerName = payment.payer?.first_name || 'Jugador'

    if (!buyerEmail) {
      console.error('No buyer email in payment:', payment.id)
      return res.status(200).json({ received: true })
    }

    await resend.emails.send({
      from: 'Prode Mundial 2026 <onboarding@resend.dev>',
      to: buyerEmail,
      subject: '¡Tu acceso al Prode Mundial 2026 ya está acá! ⚽',
      html: buildEmail(buyerName),
    })

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(200).json({ received: true })
  }
}

function buildEmail(name) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Arial,sans-serif;color:#ffffff;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">

    <div style="text-align:center;padding:32px 0 24px;">
      <div style="font-size:64px;line-height:1;">⚽</div>
      <h1 style="color:#00c853;font-size:28px;margin:16px 0 6px;font-weight:800;">¡Tu acceso llegó!</h1>
      <p style="color:#888;margin:0;font-size:15px;">Prode Mundial 2026</p>
    </div>

    <p style="color:#ddd;font-size:16px;line-height:1.6;">Hola ${name},</p>
    <p style="color:#ddd;font-size:16px;line-height:1.6;">¡Gracias por tu compra! Ya podés empezar a jugar el Prode Mundial 2026.</p>

    <div style="background:#1a2235;border-radius:16px;padding:28px;margin:24px 0;text-align:center;">
      <p style="color:#aaa;margin:0 0 18px;font-size:14px;">Tu acceso exclusivo:</p>
      <a href="${APP_URL}/register"
         style="display:inline-block;background:#00c853;color:#0a0f1e;font-weight:800;font-size:17px;padding:14px 36px;border-radius:12px;text-decoration:none;">
        Crear mi cuenta y jugar
      </a>
    </div>

    <div style="background:#1a2235;border-radius:16px;padding:20px;margin:16px 0;">
      <h3 style="color:#fff;margin:0 0 14px;font-size:16px;">Cómo instalarla en tu celular</h3>
      <p style="color:#aaa;margin:0 0 10px;font-size:14px;line-height:1.5;">
        🤖 <strong style="color:#ddd;">Android (Chrome):</strong> abrí el link en Chrome → menú ⋮ → "Agregar a pantalla de inicio"
      </p>
      <p style="color:#aaa;margin:0;font-size:14px;line-height:1.5;">
        🍎 <strong style="color:#ddd;">iPhone (Safari):</strong> abrí el link en Safari → botón Compartir ↑ → "Agregar a pantalla de inicio"
      </p>
    </div>

    <div style="background:#1a2235;border-radius:16px;padding:20px;margin:16px 0;">
      <h3 style="color:#fff;margin:0 0 14px;font-size:16px;">Sistema de puntuación</h3>
      <p style="color:#aaa;margin:0 0 8px;font-size:14px;">🎯 Resultado exacto = <strong style="color:#00c853;">3 puntos</strong></p>
      <p style="color:#aaa;margin:0 0 8px;font-size:14px;">✅ Ganador correcto = <strong style="color:#00c853;">1 punto</strong></p>
      <p style="color:#aaa;margin:0;font-size:14px;">⚽ Goleador correcto = <strong style="color:#00c853;">+1 punto extra</strong></p>
    </div>

    <p style="color:#555;font-size:12px;text-align:center;margin-top:32px;line-height:1.6;">
      ¡Buena suerte y que gane el mejor! 🏆<br>
      <strong style="color:#666;">Prode Mundial 2026</strong>
    </p>
  </div>
</body>
</html>`
}
