"use client"

import { useLanguage } from "@/lib/i18n/index.tsx"
import { Heart, Users2, MapPin } from "lucide-react"

export function SobreNosotrosSection() {
  const { t } = useLanguage()

  const cards = [
    {
      icon: Heart,
      titleKey: "sobre.filosofia_title",
      descKey: "sobre.filosofia_desc",
      color: "text-[#3572ef]",
      bg: "bg-[#3572ef]/10 dark:bg-[#3572ef]/20",
      border: "border-[#3572ef]/20",
    },
    {
      icon: Users2,
      titleKey: "sobre.equipo_title",
      descKey: "sobre.equipo_desc",
      color: "text-[#3abef9]",
      bg: "bg-[#3abef9]/10 dark:bg-[#3abef9]/20",
      border: "border-[#3abef9]/20",
    },
    {
      icon: MapPin,
      titleKey: "sobre.visita_title",
      descKey: "sobre.visita_desc",
      color: "text-[#050c9c] dark:text-[#a7e6ff]",
      bg: "bg-[#050c9c]/10 dark:bg-[#a7e6ff]/10",
      border: "border-[#050c9c]/20 dark:border-[#a7e6ff]/20",
    },
  ]

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-muted dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground dark:bg-card dark:text-muted-foreground text-xs font-bold uppercase tracking-widest mb-4">
            {t("sobre.section_badge")}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance mb-4">
            {t("sobre.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            {t("sobre.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, titleKey, descKey, color, bg, border }) => (
            <div
              key={titleKey}
              className="flex flex-col gap-5 p-8 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${bg} border ${border} flex items-center justify-center`}
              >
                <Icon size={24} className={color} />
              </div>

              <div>
                <h3 className="font-heading font-black text-xl text-foreground mb-2">
                  {t(titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(descKey)}
                </p>
              </div>

              {/* Extra info for "Ven a visitarnos" */}
              {titleKey === "sobre.visita_title" && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-brand-sky mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">{t("sobre.visita_address")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-sky mt-0.5 shrink-0"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-xs text-muted-foreground">{t("sobre.visita_schedule")}</span>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/xFjfgKYrCo3wSifG7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {t("sobre.visita_cta")} →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Affiliation ribbon */}
        <div className="mt-12 flex items-center justify-center gap-4 py-5 px-8 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-black text-sm shrink-0">
            TC
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-foreground leading-tight">
              Tuzos Carmen
            </p>
            <p className="text-xs text-muted-foreground">
              Escuela filial oficial · Tuzos Carmen · Liga MX
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
