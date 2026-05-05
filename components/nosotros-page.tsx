"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/index"
import { es } from "@/lib/i18n/es"
import { en } from "@/lib/i18n/en"
import { Heart, MapPin, Globe, Check, BookOpen, GraduationCap, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"


// ─── Animated soccer balls ──────────────────────────────────────
const BALL_VARIANTS = [
  { bg: "#ed742e", patch: "#0b2472", stroke: "#0b2472" },
  { bg: "#0b2472", patch: "#ed742e", stroke: "#ffffff" },
  { bg: "#ffffff", patch: "#0b2472", stroke: "#0b2472" },
]

const BALLS = [
  { id: 0,  size: 45, left: "4%",  delay: "0s",    dur: "8s",    drift: 0  },
  { id: 1,  size: 28, left: "12%", delay: "2.4s",  dur: "11s",   drift: 1  },
  { id: 2,  size: 55, left: "21%", delay: "0.8s",  dur: "9.5s",  drift: -1 },
  { id: 3,  size: 32, left: "33%", delay: "1.5s",  dur: "12s",   drift: 0  },
  { id: 4,  size: 60, left: "45%", delay: "3.2s",  dur: "10s",   drift: 1  },
  { id: 5,  size: 38, left: "57%", delay: "0.4s",  dur: "13s",   drift: -1 },
  { id: 6,  size: 42, left: "67%", delay: "2.1s",  dur: "8.5s",  drift: 1  },
  { id: 7,  size: 50, left: "78%", delay: "1.2s",  dur: "11s",   drift: 0  },
  { id: 8,  size: 35, left: "88%", delay: "3.8s",  dur: "9.5s",  drift: -1 },
  { id: 9,  size: 25, left: "93%", delay: "0.9s",  dur: "14s",   drift: 0  },
  { id: 10, size: 48, left: "28%", delay: "4.5s",  dur: "10.5s", drift: 1  },
  { id: 11, size: 65, left: "72%", delay: "2.8s",  dur: "7.5s",  drift: -1 },
  { id: 12, size: 30, left: "50%", delay: "5.1s",  dur: "12.5s", drift: 0  },
  { id: 13, size: 40, left: "8%",  delay: "3.6s",  dur: "9s",    drift: 1  },
  { id: 14, size: 52, left: "40%", delay: "1.9s",  dur: "11.5s", drift: -1 },
]

function SoccerBallSVG({ ball }: { ball: typeof BALLS[number] }) {
  const variant = BALL_VARIANTS[ball.id % BALL_VARIANTS.length]
  const clipId = `ball-clip-${ball.id}`
  return (
    <svg
      viewBox="0 0 100 100"
      width={ball.size}
      height={ball.size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="47" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="47" fill={variant.bg} />
      <g clipPath={`url(#${clipId})`} fill={variant.patch}>
        {/* Centre pentagon */}
        <polygon points="50,24 66,36 60,55 40,55 34,36" />
        {/* Top */}
        <polygon points="50,0 66,12 63,26 50,24 37,26 34,12" />
        {/* Right */}
        <polygon points="98,32 90,52 78,44 80,26 92,16" />
        {/* Left */}
        <polygon points="2,32 10,52 22,44 20,26 8,16" />
        {/* Bottom-right */}
        <polygon points="92,90 72,100 68,84 80,70 92,70" />
        {/* Bottom-left */}
        <polygon points="8,90 28,100 32,84 20,70 8,70" />
        {/* Bottom-centre */}
        <polygon points="50,100 66,90 60,72 40,72 34,90" />
      </g>
      <circle cx="50" cy="50" r="47" fill="none" stroke={variant.stroke} strokeWidth="2.5" />
    </svg>
  )
}

function AnimatedBalls() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BALLS.map((ball) => (
        <div
          key={ball.id}
          style={{
            position: "absolute",
            width: ball.size,
            height: ball.size,
            left: ball.left,
            top: -100,
            opacity: 0.22,
            animationName:
              ball.drift === 0
                ? "soccerFall"
                : ball.drift > 0
                ? "soccerFallRight"
                : "soccerFallLeft",
            animationDuration: ball.dur,
            animationDelay: ball.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        >
          <SoccerBallSVG ball={ball} />
        </div>
      ))}
    </div>
  )
}

export function NosotrosPage() {
  const { t, lang } = useLanguage()
  const translations = { es, en }
  const data = translations[lang].nosotrosPage

  // ─── Torneos carousel state ──────────────────────────────────
  const torneosTotal = data.torneos_items.length
  const [activeIdx, setActiveIdx] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  useEffect(() => {
    setIsFlipped(false)
    const flipTimer = setTimeout(() => setIsFlipped(true), 3000)
    const nextTimer = setTimeout(() => setActiveIdx((i) => (i + 1) % torneosTotal), 7000)
    return () => {
      clearTimeout(flipTimer)
      clearTimeout(nextTimer)
    }
  }, [activeIdx, torneosTotal])
  const moveTorneo = (dir: "prev" | "next") => {
    setActiveIdx((i) =>
      dir === "next" ? (i + 1) % torneosTotal : (i - 1 + torneosTotal) % torneosTotal
    )
  }

  return (
    <div>
      {/* ── Page header ──────────────────────────────────────────── */}
      <section className="pt-36 lg:pt-44 pb-20 lg:pb-28 bg-brand-deep dark:bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #ed742e 0%, transparent 60%),
                              radial-gradient(circle at 70% 50%, #ed742e 0%, transparent 60%)`,
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
          <p className="text-brand-sky text-sm font-semibold italic mt-4 tracking-wide">
            "{data.slogan}"
          </p>
        </div>
      </section>

      {/* ── Team photo showcase ───────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/equipo.jpeg"
              alt="Equipo completo de Tuzos Carmen — jugadores y cuerpo técnico"
              className="w-full h-100 sm:h-130 lg:h-150 object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
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

      {/* ── Mission & Vision ─────────────────────────────────────── */}
      <section id="mision" className="py-20 lg:py-28 bg-background scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="flex flex-col gap-5 p-8 lg:p-10 rounded-3xl bg-brand-deep text-white relative overflow-hidden">
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

      {/* ── Identidad + Grupo Pachuca ─────────────────────────────── */}
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

      {/* ── Torneos — Carousel ────────────────────────────────────── */}
      <section id="torneos" className="py-20 lg:py-28 bg-[#0b2472] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#ed742e]/20 border border-[#ed742e]/30 text-[#ed742e] text-xs font-bold uppercase tracking-widest mb-4">
              {lang === "en" ? "Competitions" : "Competencias"}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mb-4">
              {data.torneos_title}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {data.torneos_subtitle}
            </p>
          </div>

          {/* Carousel wrapper */}
          <div className="relative">
            {/* Prev button */}
            <button
              onClick={() => moveTorneo("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-[#ed742e] hover:bg-[#c55a1f] flex items-center justify-center shadow-lg transition-colors"
              aria-label="Anterior torneo"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            {/* 3-card track */}
            <div className="flex items-center justify-center gap-4 py-2 px-2">
              {([-1, 0, 1] as const).map((offset) => {
                const idx = (activeIdx + offset + torneosTotal) % torneosTotal
                const torneo = data.torneos_items[idx]
                const isCenter = offset === 0

                return (
                  <div
                    key={offset}
                    className={`transition-all duration-500 ease-in-out shrink-0
                      ${isCenter
                        ? "w-80 opacity-100 scale-100"
                        : "hidden sm:block sm:w-56 opacity-40 scale-95 cursor-pointer hover:opacity-60"
                      }`}
                    onClick={!isCenter ? () => setActiveIdx(idx) : undefined}
                  >
                    {/* Gradient border wrapper */}
                    <div
                      className="shadow-2xl"
                      style={{
                        borderRadius: '12px',
                        padding: '3px',
                        background: isCenter
                          ? 'linear-gradient(135deg, #ed742e 0%, #0b2472 50%, #ed742e 100%)'
                          : 'linear-gradient(135deg, #ed742e55 0%, #0b247255 100%)',
                      }}
                    >
                      {/* Perspective + flip container */}
                      <div style={{ perspective: '1200px' }}>
                        <div
                          style={{
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.85s cubic-bezier(0.645, 0.045, 0.355, 1)',
                            transform: isCenter && isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            position: 'relative',
                            aspectRatio: '687 / 1024',
                            borderRadius: '9px',
                          }}
                        >
                          {/* Front face — imagen */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              borderRadius: '9px',
                              overflow: 'hidden',
                            }}
                          >
                            <img
                              src={torneo.image}
                              alt={torneo.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                          </div>

                          {/* Back face — info (only rendered for center) */}
                          {isCenter && (
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                background: 'linear-gradient(160deg, #061a5c 0%, #0b2472 100%)',
                                borderRadius: '9px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '32px 28px',
                                gap: '18px',
                              }}
                            >
                              <span style={{
                                color: '#ed742e',
                                fontSize: '10px',
                                fontWeight: 800,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                              }}>
                                Dato curioso
                              </span>
                              <p style={{
                                color: 'white',
                                fontWeight: 900,
                                fontSize: '20px',
                                textAlign: 'center',
                                lineHeight: '1.25',
                                margin: 0,
                              }}>
                                {torneo.name}
                              </p>
                              <div style={{ width: '36px', height: '2px', background: 'linear-gradient(90deg, #ed742e, #0b2472)' }} />
                              <p style={{
                                color: 'rgba(255,255,255,0.85)',
                                textAlign: 'center',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                margin: 0,
                              }}>
                                {torneo.curiosity}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {data.torneos_items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIdx ? "w-6 h-2 bg-[#ed742e]" : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Ir a torneo ${i + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => moveTorneo("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-[#ed742e] hover:bg-[#c55a1f] flex items-center justify-center shadow-lg transition-colors"
              aria-label="Siguiente torneo"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>
      </section>


      {/* ── Filosofía + Equipo + Visita ──────────────────────────── */}
      <section id="equipo" className="py-20 lg:py-28 bg-background scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top grid: logo (left) + Filosofía & Equipo cards (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start">

            {/* School logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-48 lg:w-52 aspect-square rounded-3xl bg-[#fff3ea] flex items-center justify-center p-6 shadow-2xl border-2 border-[#ed742e] ring-4 ring-[#ed742e]/25">
                <img
                  src="/images/logo-tuzos.png"
                  alt="Logo Tuzos Carmen"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Filosofía + Equipo cards */}
            <div className="flex flex-col gap-5">
              {/* Filosofía */}
              <div className="flex gap-5 p-6 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#ed742e]/10 flex items-center justify-center shrink-0">
                  <BookOpen size={24} className="text-[#ed742e]" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg text-foreground mb-1.5">
                    {data.filosofia_title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.filosofia_desc}
                  </p>
                </div>
              </div>

              {/* Equipo */}
              <div className="flex gap-5 p-6 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#0b2472]/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={24} className="text-[#0b2472]" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading font-black text-lg text-foreground">
                    {data.equipo_title}
                  </h3>
                  <div className="bg-[#ed742e]/10 border-l-4 border-[#ed742e] rounded-r-xl px-4 py-3">
                    <p className="text-sm font-bold text-foreground leading-relaxed">
                      {data.equipo_highlight}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.equipo_desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visita card — full width, prominent */}
          <div
            id="visita"
            className="mt-8 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#ed742e]/40 bg-[#0b2472] scroll-mt-16 relative"
          >
            <AnimatedBalls />

            {/* Photo */}
            <div className="relative z-10 py-12 flex justify-center bg-linear-to-b from-white/5 to-transparent">
              <img
                src="/images/visitanos.png"
                alt="Ven a visitarnos"
                className="h-52 sm:h-64 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Orange divider line */}
            <div className="relative z-10 h-1 bg-linear-to-r from-transparent via-[#ed742e] to-transparent" />

            {/* Text content */}
            <div className="relative z-10 px-8 sm:px-16 py-12 text-center flex flex-col items-center gap-5">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {data.visita_title}
              </h3>
              <p className="text-white/70 leading-relaxed max-w-xl">
                {data.visita_desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 items-center text-sm text-white/70 mt-1">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#ed742e] shrink-0" />
                  <span>{data.visita_address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={15} className="text-[#ed742e] shrink-0" />
                  <span>{data.visita_schedule}</span>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/mZiVZPBscXUFSqVw7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#ed742e] hover:bg-[#c55a1f] text-white font-bold text-sm transition-colors shadow-lg"
              >
                <MapPin size={16} />
                {data.visita_cta}
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
