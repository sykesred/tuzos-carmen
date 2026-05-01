import nodemailer from "nodemailer"

// Debug opcional (puedes quitar después)
console.log("EMAIL_USER:", process.env.EMAIL_USER)
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail({
  to,
  subject,
  text,
  html,
  ics,
}: {
  to: string[]
  subject: string
  text?: string
  html?: string
  ics?: string
}) {
  try {
    console.log("📤 Enviando correo a:", to)

    await transporter.sendMail({
      from: `"Tuzos Carmen ⚽" <${process.env.EMAIL_USER}>`,
      to: to.join(","), // importante
      subject,
      text, // fallback
      html, // diseño bonito
      attachments: ics
        ? [
            {
              filename: "evento.ics",
              content: ics,
              contentType: "text/calendar",
            },
          ]
        : [],
    })

    console.log("✅ Correo enviado correctamente")
  } catch (error) {
    console.error("❌ Error enviando correo:", error)
    throw error
  }
}
