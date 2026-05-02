"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/index"
import { Users, Trophy, Star, ArrowRight } from "lucide-react"


export function HomeOverview() {
  const { lang } = useLanguage()

  const cards = [
    {
      icon: Star,
      href: "/nosotros",
      color: "text-[#ed742e]",
      bg: "bg-[#ed742e]/10",
      border: "border-[#ed742e]/20 hover:border-[#ed742e]/50",
      titleEs: "Nuestra Historia",
      titleEn: "Our Story",
      descEs: "Misión, visión, Grupo Pachuca e identidad como escuela filial oficial.",
      descEn: "Mission, vision, Grupo Pachuca and identity as an official affiliate school.",
    },
    {
      icon: Users,
      href: "/categorias",
      color: "text-[#0b2472] dark:text-brand-sky",
      bg: "bg-[#0b2472]/10 dark:bg-brand-sky/10",
      border: "border-[#0b2472]/20 hover:border-[#0b2472]/40 dark:border-brand-sky/20 dark:hover:border-brand-sky/40",
      titleEs: "8 Categorías",
      titleEn: "8 Categories",
      descEs: "De 4 a 18 años, incluyendo Sub-18 Tuzos y Tuzos Genuine.",
      descEn: "Ages 4 to 18, including Sub-18 Tuzos and Tuzos Genuine.",
    },
    {
      icon: Trophy,
      href: "/convocatorias",
      color: "text-[#ed742e]",
      bg: "bg-[#ed742e]/10",
      border: "border-[#ed742e]/20 hover:border-[#ed742e]/50",
      titleEs: "Inscripciones",
      titleEn: "Enrollment",
      descEs: "Inscríbete o solicita clase de prueba.",
      descEn: "Enroll or request an official tryout for your player.",
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-muted dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest mb-4">
            {lang === "en" ? "Explore" : "Explora"}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-4">
            {lang === "en" ? "Everything Tuzos Carmen" : "Todo Tuzos Carmen"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {lang === "en"
              ? "Discover our programs, history, categories, and how to be part of the family."
              : "Conoce nuestros programas, historia, categorías y cómo ser parte de la familia."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {cards.map(({ icon: Icon, href, color, bg, border, titleEs, titleEn, descEs, descEn }) => (
            <Link
              key={href}
              href={href}
              className={`group flex flex-col gap-5 p-7 rounded-2xl bg-card border ${border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon size={22} className={color} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-black text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {lang === "en" ? titleEn : titleEs}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "en" ? descEn : descEs}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                {lang === "en" ? "Learn more" : "Ver más"}
                <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
