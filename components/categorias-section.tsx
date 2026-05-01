"use client"

import { useLanguage } from "@/lib/i18n/index"
import { es } from "@/lib/i18n/es"
import { en } from "@/lib/i18n/en"
import { MessageCircle, Heart } from "lucide-react"

const WHATSAPP_BASE = "https://wa.me/529382780560?text="

type CatItem = {
  age: string
  name: string
  desc: string
  schedule: string
}

const ACCENT_GRADIENT = "from-[#6d28d9] to-[#f97316]"

const CAT_IDS = [
  "cat-5-6",
  "cat-7-8",
  "cat-9-10",
  "cat-11-12",
  "cat-sub15",
  "cat-sub18",
  "cat-genuine",
]

export function CategoriasSection() {
  const { t, lang } = useLanguage()
  const translations = { es, en }
  const cats = translations[lang].categorias.cats as unknown as CatItem[]
  const genuineData = translations[lang].genuine

  return (
    <section id="categorias" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/40 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t("categorias.section_badge")}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance mb-4">
            {t("categorias.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            {t("categorias.subtitle")}
          </p>
        </div>

        {/* Genuine category — FEATURED top card */}
        <div
          id="genuine"
          className="relative rounded-3xl overflow-hidden border-2 border-orange-400/60 dark:border-orange-500/40 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-orange-950/40 dark:via-amber-950/20 dark:to-orange-900/30 mb-10 shadow-xl shadow-orange-200/40 dark:shadow-orange-900/20"
        >
          {/* Orange top accent bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#f97316]" aria-hidden="true" />

          {/* Decorative glows */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-400/20 blur-3xl -translate-y-1/2 translate-x-1/3"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-400/15 blur-3xl translate-y-1/2 -translate-x-1/3"
            aria-hidden="true"
          />

          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left – general objective */}
              <div className="flex flex-col gap-4">
                <span className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-orange-500/15 border border-orange-400/50 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wide">
                  <Heart size={13} className="fill-current" />
                  {genuineData.section_badge}
                </span>
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-orange-900 dark:text-orange-100">
                  {genuineData.title}
                </h3>
                <p className="text-sm text-orange-800/70 dark:text-orange-200/70 leading-relaxed">
                  {genuineData.subtitle}
                </p>
                <div>
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wide mb-2">
                    {genuineData.objetivo_general_title}
                  </p>
                  <ul className="space-y-1.5">
                    {genuineData.objetivo_general_items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-orange-800/80 dark:text-orange-200/80">
                        <span className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center – specific objective */}
              <div className="flex flex-col items-center text-center gap-4 py-8 px-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-orange-300/60 dark:border-orange-400/20 shadow-sm">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                  {genuineData.objetivo_especifico_title}
                </p>
                <blockquote className="font-heading font-black text-xl text-orange-900 dark:text-orange-100 leading-snug">
                  {genuineData.objetivo_especifico_quote}
                </blockquote>
                <p className="text-sm text-orange-700/80 dark:text-orange-300/80 italic">
                  {genuineData.objetivo_especifico_eje}
                </p>
              </div>

              {/* Right – motto + date */}
              <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-5">
                <p className="font-heading font-black text-2xl sm:text-3xl text-orange-700 dark:text-orange-300 leading-snug">
                  {genuineData.motto}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="font-heading font-black text-4xl text-orange-900 dark:text-orange-100">
                    {genuineData.date_label}
                  </p>
                  <p className="text-sm text-orange-700/80 dark:text-orange-300/80">
                    {genuineData.date_desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((cat, i) => (
            <div
              key={cat.age}
              id={CAT_IDS[i]}
              className="group relative bg-blue-50 dark:bg-card border border-blue-100 dark:border-border rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 scroll-mt-20"
            >
              {/* Gradient top bar */}
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${ACCENT_GRADIENT}`}
                aria-hidden="true"
              />

              <div className="p-6">
                {/* Age badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${ACCENT_GRADIENT} mb-4`}
                >
                  {cat.age}
                </span>

                {/* Name */}
                <h3 className="font-heading font-black text-xl text-gray-900 dark:text-foreground mb-2">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-blue-600 dark:text-muted-foreground leading-relaxed mb-5">
                  {cat.desc}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-blue-500 dark:text-muted-foreground">
                    <Users size={14} />
                    <span className="flex items-center gap-1.5 text-xs text-blue-500 dark:text-muted-foreground">
                      🕒 {cat.schedule}
                    </span>
                  </div>
                  <a
                    href={`${WHATSAPP_BASE}${encodeURIComponent(`Hola, quisiera información sobre inscripciones en ${cat.name} (${cat.age}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-[#050c9c] dark:text-primary hover:text-[#3572ef] dark:hover:text-primary/80 transition-colors"
                  >
                    <MessageCircle size={13} />
                    Inscribirse
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
