"use client"

import { useLanguage } from "@/lib/i18n/index.tsx"
import { MessageCircle, ChevronRight } from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/529382780560?text=Hola%2C%20me%20interesa%20inscribir%20a%20mi%20hijo%20en%20Tuzos%20Carmen."

export function HeroSection() {
  const { t } = useLanguage()

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-deep dark:bg-background"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3572ef 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #3abef9 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left – text content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sky/20 border border-brand-sky/40 text-brand-sky text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-pulse" />
                {t("hero.badge")}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-balance text-white">
              {t("hero.heading_1")}{" "}
              <span className="text-brand-sky">{t("hero.heading_2")}</span>
              <br />
              {t("hero.heading_3")}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/70 max-w-lg leading-relaxed text-pretty">
              {t("hero.subheading")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-2xl font-semibold text-base hover:bg-[#20bd5a] active:scale-95 transition-all shadow-lg shadow-[#25D366]/30"
              >
                <MessageCircle size={20} />
                {t("hero.cta_primary")}
              </a>
              <button
                onClick={() => scrollTo("#categorias")}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold text-base hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm"
              >
                {t("hero.cta_secondary")}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right – hero image */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-brand-sky/20 blur-3xl" aria-hidden="true" />
              <img
                src="/images/hero.jpg"
                alt="Equipo completo de Tuzos Cd. del Carmen — jugadores y cuerpo técnico"
                className="relative z-10 w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-white dark:bg-card rounded-2xl px-5 py-3 shadow-xl border border-border">
                <p className="text-2xl font-black font-heading text-primary leading-none">150+</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Jugadores activos</p>
              </div>
              <div className="absolute -top-4 -right-4 z-20 bg-white dark:bg-card rounded-2xl px-5 py-3 shadow-xl border border-border">
                <p className="text-2xl font-black font-heading text-brand-sky leading-none">6</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Categorías</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {[
            { value: t("hero.stat_1_value"), label: t("hero.stat_1_label") },
            { value: t("hero.stat_2_value"), label: t("hero.stat_2_label") },
            { value: t("hero.stat_3_value"), label: t("hero.stat_3_label") },
            { value: t("hero.stat_4_value"), label: t("hero.stat_4_label") },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 bg-white/5 px-6 py-5"
            >
              {stat.value && (
                <span className="font-heading font-black text-4xl sm:text-5xl text-white leading-none">
                  {stat.value}
                </span>
              )}
              <span className="text-sm sm:text-base text-white/60 font-medium text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  )
}
