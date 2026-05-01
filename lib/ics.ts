import { createEvent } from "ics"

export function generateICS({
  name,
  email,
  category,
  date,
  time,
}: {
  name: string
  email: string
  category: string
  date: string
  time: string
}) {
  const [year, month, day] = date.split("-").map(Number)
  const [hour, minute] = time.split(":").map(Number)

  return new Promise<string>((resolve, reject) => {
    createEvent(
      {
        title: `Clase muestra - ${category}`,
        description: `Alumno: ${name} (${email})`,
        start: [year, month, day, hour, minute],
        duration: { hours: 1 },
        location: "Filial Tuzos Carmen",
      },
      (error, value) => {
        if (error) return reject(error)
        resolve(value!)
      }
    )
  })
}
