"use client"

import { useLanguage } from "@/lib/i18n/index.tsx"
import { es } from "@/lib/i18n/es"
import { en } from "@/lib/i18n/en"
import { MessageCircle, Star, Check, CalendarDays } from "lucide-react"

const WHATSAPP_INSCRIPCION =
  "https://wa.me/529382780560?text=Hola%2C%20me%20interesa%20inscribir%20a%20mi%20hijo%20en%20Tuzos%20Carmen."

type ConvocatoriasSection = {
  card_1_title: string
  card_1_tagline: string
  card_1_desc: string
  card_1_badge: string
  card_1_cta: string
  card_1_items: string[]
  card_1_affiliation: string
  card_1_talent: string
  card_2_title: string
  card_2_desc: string
  card_2_badge: string
  card_2_cta: string
  card_2_items: string[]
}

export function ConvocatoriasSection() {
  const { t, lang } = useLanguage()
  const translations = { es, en }
  const data: ConvocatoriasSection = translations[lang].convocatorias

  return (
    <section id="convocatorias" className="py-20 lg:py-28 bg-secondary dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground dark:bg-muted dark:text-muted-foreground text-xs font-bold uppercase tracking-widest mb-4">
            {t("convocatorias.section_badge")}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance mb-4">
            {t("convocatorias.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            {t("convocatorias.subtitle")}
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 – Inscripción */}
          <div className="relative flex flex-col gap-6 p-8 lg:p-10 rounded-3xl bg-primary text-primary-foreground overflow-hidden">
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-sky/20 blur-3xl -translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col gap-6 flex-1">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                {data.card_1_badge}
              </span>

              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-2 text-balance">
                  {data.card_1_title}
                </h3>
                <p className="text-brand-sky font-semibold text-sm sm:text-base mb-3">
                  {data.card_1_tagline}
                </p>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                  {data.card_1_desc}
                </p>
              </div>

              {/* List */}
              <ul className="space-y-2.5">
                {data.card_1_items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                    <Check size={16} className="text-brand-sky shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Affiliation & talent notes */}
              <div className="space-y-2 pt-1">
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-medium">
                  {data.card_1_affiliation}
                </p>
                <p className="text-brand-sky/90 text-xs sm:text-sm leading-relaxed italic">
                  {data.card_1_talent}
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href={WHATSAPP_INSCRIPCION}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-2xl font-semibold text-sm hover:bg-[#20bd5a] active:scale-95 transition-all shadow-lg shadow-black/20"
            >
              <MessageCircle size={18} />
              {data.card_1_cta}
            </a>
          </div>

          {/* Card 2 – Visorias */}
          <div className="relative flex flex-col gap-6 p-8 lg:p-10 rounded-3xl bg-card border border-border overflow-hidden hover:border-brand-sky/50 transition-colors">
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-sky/10 blur-3xl -translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col gap-6 flex-1">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-brand-sky/15 border border-brand-sky/30 text-brand-sky text-xs font-semibold">
                <Star size={11} className="fill-brand-sky" />
                {data.card_2_badge}
              </span>

              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-foreground mb-3 text-balance">
                  {data.card_2_title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {data.card_2_desc}
                </p>
              </div>

              {/* List */}
              <ul className="space-y-2.5">
                {data.card_2_items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check size={16} className="text-brand-sky shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href="https://web.ufd.mx/visorias/"
              className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <CalendarDays size={18} />
              {data.card_2_cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
