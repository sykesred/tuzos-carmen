"use client"

import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useLanguage } from "@/lib/i18n/index"
import Swal from "sweetalert2"
import { CATEGORIAS } from "@/lib/categorias"
import { info } from "console"

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
    weekendNote: "📅 Tryout classes available weekdays only (Mon–Fri)",
  },
}

export default function BookingCalendar() {
  const { lang } = useLanguage()
  const tx = UI[lang as keyof typeof UI] ?? UI.es

  const [selectedCategory, setCategory] = useState("")
  const selectedCat = CATEGORIAS.find(c => c.id === selectedCategory)

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleDateClick = (info: any) => {
    const day = new Date(info.dateStr + "T00:00:00").getDay()

    if (day === 0 || day === 6) return
    if (!selectedCat) return
    if (!selectedCat.dias.includes(day)) return

    setSelectedDate(info.dateStr)
    setSelectedTime(null)
  }

  const handleBooking = async () => {
    if (!selectedCategory || !selectedDate || !selectedTime || !name || !email) {
      alert(tx.missingFields)
      return
    }

    try {
      const selectedCat = CATEGORIAS.find(c => c.id === selectedCategory)

      await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category: selectedCat?.id,
          categoryLabel: selectedCat?.nombre,
          date: selectedDate,
          time: selectedTime,
        }),
      })

      await Swal.fire({
        icon: "success",
        title: "Tuzos Carmen ⚽",
        text: "Tu clase muestra se agendó correctamente",
        confirmButtonColor: "#ed742e",
      })
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error",
      })
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const stepsDone = [
    !!selectedCategory,
    !!selectedDate,
    !!selectedTime,
    !!(name && email),
  ]

  return (
    <div id="agenda-clase" className="booking-calendar-wrapper max-w-5xl mx-auto">

      <div className="w-full max-w-3xl mx-auto mb-10">

      {/* 🔵 FILA DE CÍRCULOS (REFERENCIA REAL) */}
      <div className="relative">

        {/* Línea centrada EXACTAMENTE con los círculos */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#c8e4f8] dark:bg-[#205295] z-0" />

        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#3572ef] transition-all duration-500 z-0"
          style={{
            width: `${(stepsDone.filter(Boolean).length - 1) / (tx.steps.length - 1) * 100}%`
          }}
        />

      {/* CÍRCULOS */}
      <div className="flex justify-between items-center relative z-10">
        {tx.steps.map((_, i) => {
          const isDone = stepsDone[i]

          return (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isDone
                  ? "bg-[#FF653F] text-white"
                  : "bg-[#dff1ff] dark:bg-[#205295] text-[#3572ef] dark:text-[#a7e6ff]"
              }`}
            >
              {isDone ? "✓" : i + 1}
            </div>
          )
        })}
      </div>
    </div>

      {/* 🔵 LABELS (YA SEPARADOS) */}
      <div className="flex justify-between mt-3">
        {tx.steps.map((label: string, i: number) => (
          <span key={i} className="text-xs text-center w-8">
            {label}
          </span>
        ))}
      </div>
    </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* SIDEBAR */}
        <div className="flex flex-col gap-4">

          {/* CATEGORY */}
          <div className="bg-white dark:bg-[#144272] rounded-2xl p-5">
            <p className="text-xs mb-3">{tx.sectionCategory}</p>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setCategory(e.target.value)
                setSelectedDate(null)
                setSelectedTime(null)
              }}
              /* 🔥 ESTE ES EL FIX CLAVE */
              style={{ colorScheme: "light dark" }}

              className="
                w-full
                bg-[#f5faff]
                dark:bg-[#0a2647]
                text-[#0a0f2c]
                dark:text-[#e8f4fd]
                border border-[#c8e4f8]
                dark:border-[#205295]
                rounded-xl
                px-4 py-3
                text-sm font-medium
                focus:outline-none
                focus:ring-2
                focus:ring-[#3572ef]
                focus:border-transparent
                transition-all
                cursor-pointer
              "
            >
              <option value="">{tx.selectCategory}</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* HORARIOS */}
          {selectedDate && (
            <div className="bg-white dark:bg-[#144272] rounded-2xl p-5">
              <p className="text-xs mb-1">{tx.sectionTime}</p>
              <p className="text-xs mb-3">{formatDate(selectedDate)}</p>

              <div className="grid grid-cols-2 gap-2">
                {selectedCat?.horarios.map((h, i) => {
                  const label = `${h.inicio} - ${h.fin}`
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(label)}
                      className={`py-3 rounded-xl ${
                        selectedTime === label
                          ? "bg-[#FF653F] text-white shadow-md scale-105"
                          : "bg-[#f5faff] dark:bg-[#0a2647] text-[#3572ef] dark:text-[#a7e6ff] border border-[#c8e4f8] dark:border-[#205295] hover:bg-[#FFA02E]/20 dark:hover:bg-[#205295] hover:scale-[1.03]"
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* FORM */}
          {selectedTime && (
            <div className="bg-white dark:bg-[#144272] rounded-2xl p-5">
              <p className="text-xs mb-3">{tx.sectionData}</p>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={tx.placeholderName}
                className="w-full mb-3 bg-[#f5faff] dark:bg-[#0a2647] text-[#0a0f2c] dark:text-[#e8f4fd] border border-[#c8e4f8] dark:border-[#205295] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3572ef] focus:border-transparent transition-all"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tx.placeholderEmail}
                className="w-full mb-4 bg-[#f5faff] dark:bg-[#0a2647] text-[#0a0f2c] dark:text-[#e8f4fd] border border-[#c8e4f8] dark:border-[#205295] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3572ef] focus:border-transparent transition-all"
              />

              <button
                onClick={handleBooking}
                className="w-full bg-[#FF653F] text-white py-3 rounded-xl"
              >
                {tx.confirm}
              </button>
            </div>
          )}
        </div>

        {/* CALENDAR */}
        <div className="lg:col-span-2 bg-white dark:bg-[#144272] rounded-2xl p-5">
          <p className="text-xs mb-4">{tx.sectionCalendar}</p>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={(info) => 
              handleDateClick(info)}
            height="auto"
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next",
            }}
            dayCellClassNames={(info) => {
              const day = info.date.getDay()

              if (selectedDate === info.dateStr) {
                return ["fc-day-selected"]
              }

              if (info.isOther) return ["fc-day-disabled"]
              if (day === 0 || day === 6) return ["fc-day-disabled"]
              if (!selectedCat) return ["fc-day-disabled"]
              if (!selectedCat.dias.includes(day)) return ["fc-day-disabled"]

              return []
            }}
          />

          <p className="text-xs text-center mt-3 opacity-70">
            {tx.weekendNote}
          </p>
        </div>

      </div>
    </div>
  )
}