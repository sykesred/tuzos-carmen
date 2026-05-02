"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/index.tsx"
import { MessageCircle } from "lucide-react"

const WHATSAPP_INFO_URL =
  "https://wa.me/529382780560?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Tuzos%20Carmen."

const WHATSAPP_INSCRIPCION_URL =
  "https://wa.me/529382780560?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20las%20inscripciones%20en%20Tuzos%20Carmen."

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/tuzos.carmen",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/tuzoscdcarmen",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@tuzosciudaddelcarmen",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.55a8.18 8.18 0 004.77 1.52V6.6a4.85 4.85 0 01-1-.09z" />
      </svg>
    ),
  },
  {
    href: WHATSAPP_INFO_URL,
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.845L.057 23.43a.75.75 0 00.931.9l5.688-1.492A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.09-1.393l-.364-.217-3.779.992.999-3.683-.237-.378A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
]

export function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { label: t("nav.nosotros"), href: "/nosotros" },
    { label: t("nav.categorias"), href: "/categorias" },
    { label: t("nav.convocatorias"), href: "/convocatorias" },
    { label: t("nav.patrocinios"), href: "/patrocinios" },
    { label: t("nav.contacto"), href: "/contacto" },
  ]

  return (
    <footer className="bg-[#030870] dark:bg-[#050c1a] text-white">
      {/* WhatsApp CTA banner */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading font-black text-xl text-white mb-1">
                ¿Listo para unirte a Tuzos Carmen?
              </p>
              <p className="text-sm text-white/60">
                Escríbenos directo por WhatsApp al <span className="text-white font-semibold">938 278 0560</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={WHATSAPP_INSCRIPCION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#25d366] hover:bg-[#20bb5a] text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-[#25d366]/30"
              >
                <MessageCircle size={17} />
                Información de inscripciones
              </a>
              <a
                href={WHATSAPP_INFO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#ed742e] hover:bg-[#c55a1f] text-white font-semibold text-sm rounded-xl transition-all hover:scale-[1.03] active:scale-95"
              >
                <MessageCircle size={17} />
                Más información
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <Image
                src="/images/logo-tuzos.png"
                alt="Tuzos Carmen"
                width={48}
                height={48}
                className="shrink-0 group-hover:scale-105 transition-transform drop-shadow-md mix-blend-lighten"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-black text-lg text-white leading-none">
                  Tuzos Carmen
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <p className="text-xs text-white/35">{t("footer.affiliation")}</p>

            {/* Social */}
            <div className="flex gap-3 mt-2">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
              {t("footer.nav_title")}
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
              {t("footer.contact_title")}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:+529382780560"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  938 278 0560
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("contacto.info_email")}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t("contacto.info_email")}
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/DtDPMrJvajAHpZEW9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors leading-snug block"
                >
                  {t("contacto.info_address")}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={WHATSAPP_INFO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[#25d366] hover:text-[#4ade80] transition-colors font-medium"
                >
                  <MessageCircle size={14} />
                  Preguntar por WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <span>{t("footer.copyright")}</span>
          <span>Hecho con pasión por el fútbol</span>
        </div>
      </div>
    </footer>
  )
}
