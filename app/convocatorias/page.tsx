import { ConvocatoriasSection } from "@/components/convocatorias-section"

export const metadata = {
  title: "Convocatorias | Tuzos Cd. del Carmen",
  description:
    "Inscribe a tu tuzobrino en la Escuela Tuzos C.d Carmen o solicita una visoria oficial. Categorías de 4 a 18 años.",
}

export default function ConvocatoriasPage() {
  return (
    <main>
      {/* Page header */}
      <div className="pt-32 lg:pt-36 pb-16 lg:pb-20 bg-brand-deep dark:bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #3572ef 0%, transparent 60%),
                              radial-gradient(circle at 70% 50%, #3abef9 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Convocatorias
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Dos vías para formar parte de la familia Tuzos C.d Carmen.
          </p>
        </div>
      </div>
      <div id="inscripcion">
        <ConvocatoriasSection />
      </div>
    </main>
  )
}
