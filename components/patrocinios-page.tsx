"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/index.tsx"
import { es } from "@/lib/i18n/es"
import { en } from "@/lib/i18n/en"
import { MessageCircle } from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/529382780560?text=Hola%2C%20me%20interesa%20conocer%20las%20opciones%20de%20patrocinio%20de%20Tuzos%20Carmen."

export function PatrociniosPage() {
  const { lang } = useLanguage()
  const translations = { es, en }
  const data = translations[lang].patrocinios
  const [playeraFlipped, setPlayeraFlipped] = useState(false)

  return (
    <div>
      {/* Page header */}
      <section className="pt-36 lg:pt-44 pb-20 lg:pb-28 bg-brand-deep dark:bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #3572ef 0%, transparent 60%),
                              radial-gradient(circle at 70% 50%, #3abef9 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sky/20 border border-brand-sky/40 text-brand-sky text-xs font-semibold tracking-wide mb-6">
            {data.section_badge}
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white text-balance mb-6">
            {data.title}
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Oportunidad de inversión */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest mb-4">
              {data.oportunidad_title}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-4">
              {data.oportunidad_title}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {data.oportunidad_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Playeras de entrenamiento – flip card */}
            <div
              className="group flex flex-col gap-5 p-7 rounded-2xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer select-none"
              onMouseEnter={() => setPlayeraFlipped(true)}
              onMouseLeave={() => setPlayeraFlipped(false)}
              onClick={() => setPlayeraFlipped(f => !f)}
            >
              <div className="relative h-36" style={{ perspective: "800px" }}>
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s",
                    transform: playeraFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden bg-muted"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img src="/images/playera-front.png" alt="Frente de playera" className="w-full h-full object-contain" />
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden bg-muted"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <img src="/images/playera-back.png" alt="Reverso de playera" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {data.oportunidad_items[0].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.oportunidad_items[0].desc}
                </p>
              </div>
            </div>

            {/* Lona institucional */}
            <div className="group flex flex-col gap-5 p-7 rounded-2xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="h-36 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src="/images/lona.png"
                  alt="Lona institucional"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {data.oportunidad_items[1].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.oportunidad_items[1].desc}
                </p>
              </div>
            </div>

            {/* Visibilidad en torneos */}
            <div className="group flex flex-col gap-5 p-7 rounded-2xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="h-36 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src="/images/trofeo.png"
                  alt="Visibilidad en torneos"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {data.oportunidad_items[2].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.oportunidad_items[2].desc}
                </p>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="group flex flex-col gap-5 p-7 rounded-2xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="h-36 rounded-xl flex flex-col items-center justify-center gap-3">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg,#833AB4,#E1306C,#F77737)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.55a8.18 8.18 0 004.77 1.52V6.6a4.85 4.85 0 01-1-.09z" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.845L.057 23.43a.75.75 0 00.931.9l5.688-1.492A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.09-1.393l-.364-.217-3.779.992.999-3.683-.237-.378A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {data.oportunidad_items[3].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.oportunidad_items[3].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-brand-deep dark:bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mb-4">
            {data.cta_title}
          </h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            {data.cta_desc}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-2xl font-semibold text-base hover:bg-[#20bd5a] active:scale-95 transition-all shadow-lg shadow-[#25D366]/30"
          >
            <MessageCircle size={20} />
            {data.cta_btn}
          </a>
        </div>
      </section>
    </div>
  )
}
