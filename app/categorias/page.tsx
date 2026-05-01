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
      {/* Page header */}
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
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Nuestras Categorías
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Programas especializados de 4 a 18 años, incluyendo Tuzos
            Genuine de inclusión social.
          </p>
        </div>
      </div>

      {/* Categorías */}
      <CategoriasSection />

      {/* Calendario */}
      <section id="calendario" className="py-16 bg-gray-50 dark:bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <CalendarioHeading />
          <BookingCalendar />
        </div>
      </section>
    </main>
  )
}
