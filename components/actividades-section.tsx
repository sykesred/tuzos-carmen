"use client"

import { useLanguage } from "@/lib/i18n/index.tsx"
import { es } from "@/lib/i18n/es"
import { en } from "@/lib/i18n/en"
import { Trophy, Timer, Shield, CalendarDays } from "lucide-react"

const ICONS = [Trophy, Timer, Shield, CalendarDays]

type ActivityItem = { title: string; desc: string }

export function ActividadesSection() {
  const { t, lang } = useLanguage()
  const translations = { es, en }
  const items: ActivityItem[] = translations[lang].actividades.items

  return (
    <section
      id="actividades"
      className="py-20 lg:py-28 bg-brand-deep dark:bg-muted"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sky/20 border border-brand-sky/30 text-brand-sky text-xs font-bold uppercase tracking-widest mb-4">
            {t("actividades.section_badge")}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white text-balance mb-4">
            {t("actividades.title")}
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            {t("actividades.subtitle")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={item.title}
                className="group relative flex flex-col gap-5 p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-sky/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand-sky/20 border border-brand-sky/30 flex items-center justify-center group-hover:bg-brand-sky/30 transition-colors">
                  <Icon size={22} className="text-brand-sky" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-black text-lg text-white leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  {item.desc}
                </p>

                {/* Decorative number */}
                <span
                  className="absolute top-5 right-5 font-heading font-black text-6xl text-white/5 select-none leading-none"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
