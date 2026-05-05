import { Suspense } from "react"
import CategoriasClient from "./CategoriasClient"

import { CategoriasSection } from "@/components/categorias-section"
import BookingCalendar from "@/app/components/BookingCalendar"
import { CalendarioHeading } from "@/components/calendario-heading"

export const metadata = {
  title: "Categorías | Tuzos Carmen",
  description:
    "Conoce todas las categorías de la Escuela Tuzos Carmen: desde Baby Tuzos (4 años) hasta Sub-18 Tuzos y la especial Tuzos Genuine de inclusión.",
}

export default function CategoriasPage() {
  return (
    <main>
      {/* Header */}
      <div className="pt-32 lg:pt-36 pb-16 lg:pb-20 bg-brand-deep dark:bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 50%, #3572ef 0%, transparent 60%),
              radial-gradient(circle at 70% 50%, #3abef9 0%, transparent 60%),
              radial-gradient(circle at 50% 90%, #f97316 0%, transparent 50%)
            `,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl text-white font-black mb-4">
            Nuestras Categorías
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Programas especializados de 4 a 18 años
          </p>
        </div>
      </div>

      {/* Aquí va todo lo dinámico */}
      <Suspense>
        <CategoriasClient />
      </Suspense>
    </main>
  )
}