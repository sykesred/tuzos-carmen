"use client"

import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useLanguage } from "@/lib/i18n/index"
import Swal from "sweetalert2"

const CATEGORIES = [
  { value: "5-6", label: "Baby Tuzos" },
  { value: "7-8", label: "Mini Tuzos" },
  { value: "9-10", label: "Tuzos Kids" },
  { value: "11-12", label: "Tuzos Inicial" },
  { value: "13-15", label: "Tuzos Sub-15"},
  { value: "sub-18", label: "Tuzos Sub-18" },
  { value: "genuine", label: "Tuzos Genuine" },
]

const UI = {
  es: {
    steps: ["Categoría", "Fecha", "Horario", "Datos"],
    selectCategory: "Selecciona categoría",
    sectionCategory: "⚽ Categoría",
    sectionTime: "🕐 Horarios",
    sectionData: "👤 Tus datos",
    sectionCalendar: "📅 Selecciona una fecha",
    placeholderName: "Nombre completo",
    placeholderEmail: "Correo electrónico",
    confirm: "Confirmar reserva ⚽",
    missingFields: "Completa todos los campos",
    success: "Clase agendada correctamente ⚽",
    error: "Error al agendar",
    requestError: "Error en la solicitud",
    locale: "es-MX",
    weekdaysOnly: "Solo disponible de lunes a viernes",
    weekendNote: "📅 Clases de prueba solo en días de semana (lun–vie)",
  },
  en: {
    steps: ["Category", "Date", "Time", "Info"],
    selectCategory: "Select category",
    sectionCategory: "⚽ Category",
    sectionTime: "🕐 Time slots",
    sectionData: "👤 Your info",
    sectionCalendar: "📅 Select a date",
    placeholderName: "Full name",
    placeholderEmail: "Email address",
    confirm: "Confirm booking ⚽",
    missingFields: "Please fill in all fields",
    success: "Tryout booked successfully ⚽",
    error: "Booking error",
    requestError: "Request error",
    locale: "en-US",
    weekdaysOnly: "Available Monday through Friday only",
    weekendNote: "📅 Tryout classes available weekdays only (Mon–Fri)",
  },
}

export default function BookingCalendar() {
  const { lang } = useLanguage()
  const tx = UI[lang as keyof typeof UI] ?? UI.es
  const [category, setCategory] = useState("")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const slots = ["16:30", "17:30", "18:00", "19:00"]

  const isWeekend = (dateStr: string) => {
    const day = new Date(dateStr + "T00:00:00").getDay()
    return day === 0 || day === 6
  }

  const handleDateClick = (info: any) => {
    if (isWeekend(info.dateStr)) return
    setSelectedDate(info.dateStr)
    setSelectedTime(null)
  }

  const handleBooking = async () => {
    if (!category || !selectedDate || !selectedTime || !name || !email) {
      alert(tx.missingFields)
      return
    }

    try {
      const selectedCategory = CATEGORIES.find(c => c.value === category)

      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          category,
          categoryLabel: selectedCategory?.label,
          date: selectedDate,
          time: selectedTime,
        }),
      })

      const data = await res.json()

      console.log("response:", res)
      console.log("data:", data)

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Tuzos Carmen ⚽",
          html: `
          <p><strong>Tu clase muestra se agendó correctamente</strong></p>
          <p>📩 Enviamos la confirmación al correo que proporcionaste.</p>
          <p>⚠️ Revisa spam si no aparece en bandeja principal.</p>
          <p>¡Te esperamos en la cancha!</p>
          `,
          confirmButtonText: "¡Genial!",
          confirmButtonColor: "#ed742e", // Naranja Tuzos
          background: "#f5faff", // Fondo claro
          color: "#0b2472", // Texto oscuro
        })
      } else {
        console.error(data)
        await Swal.fire({
          icon: "error",
          title: "Error al agendar",
          text: data.error || "Ocurrió un error al agendar tu clase muestra. Por favor, inténtalo de nuevo.",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#ed742e", // Naranja Tuzos
        })
      }
    } catch (err) {
      console.error(err)
      await Swal.fire({
        icon: "error",
        title: "Error en la solicitud",
        text: "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#ed742e", // Naranja Tuzos
      })
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const stepsDone = [!!category, !!selectedDate, !!selectedTime, !!(name && email)]

  return (
    <div className="booking-calendar-wrapper max-w-5xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center justify-center mb-8 gap-0">
        {tx.steps.map((label: string, i: number) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  stepsDone[i]
                    ? "bg-[#FF653F] text-white shadow-md"
                    : "bg-[#dff1ff] dark:bg-[#205295] text-[#3572ef] dark:text-[#a7e6ff]"
                }`}
              >
                {stepsDone[i] ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${
                  stepsDone[i]
                    ? "text-[#050c9c] dark:text-[#3abef9]"
                    : "text-[#3572ef]/60 dark:text-[#a7e6ff]/60"
                }`}
              >
                {label}
              </span>
            </div>
            {i < tx.steps.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-0.5 mb-4 mx-1 transition-all duration-500 ${
                  stepsDone[i] ? "bg-[#3572ef]" : "bg-[#c8e4f8] dark:bg-[#205295]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          <div className="bg-white dark:bg-[#144272] rounded-2xl shadow-sm border border-[#c8e4f8] dark:border-[#205295] p-5">
            <p className="font-heading font-bold text-[#050c9c] dark:text-[#3abef9] text-xs uppercase tracking-widest mb-3">
              {tx.sectionCategory}
            </p>
            <select
              className="w-full bg-[#f5faff] dark:bg-[#0a2647] border border-[#c8e4f8] dark:border-[#205295] text-[#0a0f2c] dark:text-[#e8f4fd] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3572ef] focus:border-transparent transition-all cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">{tx.selectCategory}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div className="bg-white dark:bg-[#144272] rounded-2xl shadow-sm border border-[#c8e4f8] dark:border-[#205295] p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="font-heading font-bold text-[#050c9c] dark:text-[#3abef9] text-xs uppercase tracking-widest mb-1">
                {tx.sectionTime}
              </p>
              <p className="text-xs text-[#3572ef] dark:text-[#a7e6ff] mb-3 capitalize">
                {formatDate(selectedDate)}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      selectedTime === time
                        ? "bg-[#FF653F] text-white shadow-md scale-105"
                        : "bg-[#f5faff] dark:bg-[#0a2647] text-[#3572ef] dark:text-[#a7e6ff] border border-[#c8e4f8] dark:border-[#205295] hover:bg-[#FFA02E]/20 dark:hover:bg-[#205295] hover:scale-[1.03]"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          {selectedTime && (
            <div className="bg-white dark:bg-[#144272] rounded-2xl shadow-sm border border-[#c8e4f8] dark:border-[#205295] p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="font-heading font-bold text-[#050c9c] dark:text-[#3abef9] text-xs uppercase tracking-widest mb-3">
                {tx.sectionData}
              </p>
              <input
                type="text"
                placeholder={tx.placeholderName}
                className="w-full bg-[#f5faff] dark:bg-[#0a2647] border border-[#c8e4f8] dark:border-[#205295] text-[#0a0f2c] dark:text-[#e8f4fd] rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#3572ef] focus:border-transparent transition-all placeholder:text-[#3572ef]/40"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder={tx.placeholderEmail}
                className="w-full bg-[#f5faff] dark:bg-[#0a2647] border border-[#c8e4f8] dark:border-[#205295] text-[#0a0f2c] dark:text-[#e8f4fd] rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#3572ef] focus:border-transparent transition-all placeholder:text-[#3572ef]/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleBooking}
                className="w-full bg-[#FF653F] hover:bg-[#FFA02E] text-white font-bold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
              >
                {tx.confirm}
              </button>
            </div>
          )}
        </div>

        {/* Calendar panel */}
        <div className="lg:col-span-2 bg-white dark:bg-[#144272] rounded-2xl shadow-sm border border-[#c8e4f8] dark:border-[#205295] p-5">
          <p className="font-heading font-bold text-[#050c9c] dark:text-[#3abef9] text-xs uppercase tracking-widest mb-4">
            {tx.sectionCalendar}
          </p>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            height="auto"
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next",
            }}
            dayCellClassNames={(info) => {
              const day = info.date.getDay()
              return day === 0 || day === 6 ? ["fc-day-weekend-disabled"] : []
            }}
          />
          <p className="text-xs text-center text-muted-foreground mt-3 opacity-70">
            {tx.weekendNote}
          </p>
        </div>
      </div>
    </div>
  )
}
