"use client"

import { useLanguage } from "@/lib/i18n/index.tsx"
import { es } from "@/lib/i18n/es"
import { en } from "@/lib/i18n/en"
import { Heart, MapPin, Trophy, Globe, Check } from "lucide-react"

export function NosotrosPage() {
  const { t, lang } = useLanguage()
  const translations = { es, en }
  const data = translations[lang].nosotrosPage

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

      {/* Team photo showcase */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/equipo.jpeg"
              alt="Equipo completo de Tuzos Cd. del Carmen — jugadores y cuerpo técnico"
              className="w-full h-[400px] sm:h-[520px] lg:h-[600px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <p className="text-brand-sky text-xs font-bold uppercase tracking-widest mb-2">
                {lang === "en" ? "Our Team" : "Nuestro Equipo"}
              </p>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white leading-tight">
                {lang === "en"
                  ? "Proud of every player and coach"
                  : "Orgullosos de cada jugador y entrenador"}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mision" className="py-20 lg:py-28 bg-background scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="flex flex-col gap-5 p-8 lg:p-10 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full bg-brand-sky/20 blur-3xl -translate-y-1/3 translate-x-1/3"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                  <Heart size={22} className="text-brand-sky" />
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4">
                  {data.mision_title}
                </h2>
                <p className="text-white/80 leading-relaxed text-base">
                  {data.mision_desc}
                </p>
              </div>
            </div>

            {/* Visión */}
            <div className="flex flex-col gap-5 p-8 lg:p-10 rounded-3xl bg-card border border-border relative overflow-hidden hover:border-brand-sky/40 transition-colors">
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full bg-brand-sky/10 blur-3xl -translate-y-1/3 translate-x-1/3"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-sky/15 border border-brand-sky/30 flex items-center justify-center mb-5">
                  <Globe size={22} className="text-brand-sky" />
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-foreground mb-4">
                  {data.vision_title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {data.vision_desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Identidad + Grupo Pachuca */}
      <section id="grupo" className="py-20 lg:py-28 bg-muted dark:bg-muted/30 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Identidad */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest mb-6">
                {data.identidad_title}
              </span>
              <ul className="space-y-5">
                {data.identidad_items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-black text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grupo Pachuca */}
            <div className="flex flex-col gap-6 p-8 rounded-2xl bg-card border border-border">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest mb-4">
                  {data.grupo_title}
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {data.grupo_desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {data.grupo_clubs.map((club) => (
                  <div
                    key={club}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-sky shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{club}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Torneos */}
      <section id="torneos" className="py-20 lg:py-28 bg-brand-deep dark:bg-muted/20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sky/20 border border-brand-sky/30 text-brand-sky text-xs font-bold uppercase tracking-widest mb-4">
              {data.torneos_title}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white dark:text-foreground mb-4">
              {data.torneos_title}
            </h2>
            <p className="text-white/60 dark:text-muted-foreground max-w-xl mx-auto">
              {data.torneos_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {data.torneos_items.map((torneo) => (
              <div
                key={torneo.name}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 dark:bg-card border border-white/10 dark:border-border hover:bg-white/10 dark:hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-sky/20 border border-brand-sky/30 flex items-center justify-center shrink-0">
                  <Trophy size={18} className="text-brand-sky" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white dark:text-foreground leading-tight">
                    {torneo.name}
                  </p>
                  <p className="text-xs text-white/50 dark:text-muted-foreground mt-0.5">
                    {torneo.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filosofía + Equipo + Visita */}
      <section id="equipo" className="py-20 lg:py-28 bg-background scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filosofía */}
            <div className="flex flex-col rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="h-48 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/filosofia.png"
                  alt="Filosofía institucional"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-3 p-8">
                <h3 className="font-heading font-black text-xl text-foreground">
                  {data.filosofia_title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.filosofia_desc}
                </p>
              </div>
            </div>

            {/* Equipo */}
            <div className="flex flex-col rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="h-48 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/equipo.png"
                  alt="Conoce al equipo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-3 p-8">
                <h3 className="font-heading font-black text-xl text-foreground">
                  {data.equipo_title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.equipo_desc}
                </p>
              </div>
            </div>

            {/* Visita */}
            <div
              id="visita"
              className="flex flex-col rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden scroll-mt-16"
            >
              <div className="h-48 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/visitanos.png"
                  alt="Ven a visitarnos"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-5 p-8">
                <div>
                  <h3 className="font-heading font-black text-xl text-foreground mb-2">
                    {data.visita_title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.visita_desc}
                  </p>
                </div>
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-brand-sky mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">{data.visita_address}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check size={14} className="text-brand-sky mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">{data.visita_schedule}</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Ciudad+del+Carmen,+Campeche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {data.visita_cta} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
