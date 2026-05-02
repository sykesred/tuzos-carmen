import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/mailer"

// 🎯 Mapeo de categorías (value → label bonito)
const CATEGORY_LABELS: Record<string, string> = {
  "5-6": "Baby Tuzos (5-6 años)",
  "6-7": "Mini Tuzos (7-8 años)",
  "8-9": "Tuzos Kids (9-10 años)",
  "10-11": "Tuzos Initial (10-11 años)",
  "12-13": "Tuzos Development (12-13 años)",
  "sub-15": "Tuzos Sub-15",
  "sub-18": "Tuzos Sub-18",
  "genuine": "Tuzos Genuine",
  }

// 📅 Generador de archivo ICS
function generateICS(date: string, time: string) {
  const start = new Date(`${date}T${time}:00`)
  const end = new Date(start.getTime() + 60 * 60 * 1000)

  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Clase muestra Tuzos
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
DESCRIPTION:Clase muestra Tuzos Carmen
LOCATION:Tuzos Carmen
END:VEVENT
END:VCALENDAR`
}

// 🚀 POST
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, category, date, time } = body

    // Validación básica
    if (!name || !email || !category || !date || !time) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      )
    }

    // 🧠 Categoría bonita
    const categoryLabel = CATEGORY_LABELS[category] || category

    // 📅 Fecha bonita
    const fechaBonitaRaw = new Date(date).toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const fechaBonita =
      fechaBonitaRaw.charAt(0).toUpperCase() + fechaBonitaRaw.slice(1)

    // ⏰ Hora bonita
    const horaBonita = new Date(`1970-01-01T${time}`).toLocaleTimeString(
      "es-MX",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    )

    // 📎 ICS
    const ics = generateICS(date, time)

    // 🎨 HTML bonito (paleta Tuzos)
    const html = `
    <div style="font-family: Arial, sans-serif; background:#F4F6F8; padding:30px;">
      <div style="max-width:600px; margin:auto; background:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

        <div style="background:#0b2472; color:white; padding:25px; text-align:center;">
          <h2 style="margin:0;">⚽ Tuzos Carmen</h2>
          <p style="margin:5px 0 0; font-size:14px;">Clase muestra agendada</p>
        </div>

        <div style="padding:25px; color:#333;">
          <p>Hola <strong>${name}</strong>,</p>

          <p>Tu clase muestra ha sido agendada correctamente ⚽</p>

          <p> Por favor imprime este comprobante como referencia para tu clase muestra. Recuerda presentarlo al llegar a Tuzos Carmen, llegar 10 minutos antes y traer ropa cómoda, agua y ganas de divertirte ⚽</p>

          <p>Este comprobante es válido solo para la clase muestra agendada. Si deseas agendar otra clase muestra, por favor completa el formulario nuevamente.</p>


          <div style="background:#F0F4FF; padding:18px; border-radius:10px; border-left:5px solid #ed742e; margin:20px 0;">
            <p style="margin:6px 0;">📅 <strong>Fecha:</strong> ${fechaBonita}</p>
            <p style="margin:6px 0;">⏰ <strong>Hora:</strong> ${horaBonita}</p>
            <p style="margin:6px 0;">👥 <strong>Categoría:</strong> ${categoryLabel}</p>
          </div>

          <p>Adjuntamos tu evento para que lo agregues a tu calendario 📎</p>

          <div style="text-align:center; margin:25px 0;">
            <span style="display:inline-block; background:#ed742e; color:white; padding:10px 18px; border-radius:6px;">
              ¡Te esperamos en Tuzos Carmen!
            </span>
          </div>
            <center>
              <p>¡Nos vemos pronto en la cancha! ⚽</p>
            </center>
          </div>

        <div style="background:#F4F6F8; text-align:center; padding:15px; font-size:12px; color:#777;">
          © 2026 Tuzos Carmen
        </div>

      </div>
    </div>
    `

    // 📨 Texto plano (fallback)
    const text = `
Hola ${name},

Tu clase muestra ha sido agendada correctamente ⚽

Fecha: ${fechaBonita}
Hora: ${horaBonita}
Categoría: ${categoryLabel}
Por favor imprime este comprobante como referencia para tu clase muestra. Recuerda presentarlo al llegar a Tuzos Carmen, llegar 10 minutos antes y traer ropa cómoda, agua y ganas de divertirte ⚽

Este comprobante es válido solo para la clase muestra agendada. Si deseas agendar otra clase muestra, por favor completa el formulario nuevamente.

Adjuntamos tu evento para que lo agregues a tu calendario📎

¡Te esperamos en Tuzos Carmen!
`

    // 📨 Enviar correo
    await sendEmail({
      to: [email, process.env.DIRECTOR_EMAIL!],
      subject: `⚽ Clase agendada - ${categoryLabel} | Tuzos`,
      text,
      html,
      ics,
    })

    return NextResponse.json({ message: "Correo enviado correctamente" })
  } catch (error) {
    console.error("Error en /api/calendar:", error)
    return NextResponse.json(
      { error: "Error al enviar correo" },
      { status: 500 }
    )
  }
}
