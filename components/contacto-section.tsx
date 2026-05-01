"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/i18n/index.tsx"
import { MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Send, Navigation } from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/529382780560?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Tuzos%20Carmen."

const MAPS_URL = "https://maps.app.goo.gl/DtDPMrJvajAHpZEW9"
const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Batab+300+INT+24,+Pemex+II,+24160+Ciudad+del+Carmen,+Campeche,+Mexico&output=embed&z=16"

export function ContactoSection() {
  const { t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Nombre: ${formData.name}\nCorreo: ${formData.email}\nMensaje: ${formData.message}`
    )
    window.open(`https://wa.me/529382780560?text=${msg}`, "_blank")
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      id="contacto"
      className="py-20 lg:py-28 bg-brand-deep dark:bg-card"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sky/20 border border-brand-sky/30 text-brand-sky text-xs font-bold uppercase tracking-widest mb-4">
            {t("contacto.section_badge")}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white text-balance mb-4">
            {t("contacto.title")}
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            {t("contacto.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left – info + WhatsApp CTA */}
          <div className="flex flex-col gap-8">
            {/* Primary WhatsApp button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-7 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/40">
                <MessageCircle size={26} className="text-white" />
              </div>
              <div>
                <p className="font-heading font-black text-lg text-white">
                  {t("contacto.whatsapp_cta")}
                </p>
                <p className="text-sm text-white/60 mt-0.5">{t("contacto.whatsapp_desc")}</p>
              </div>
            </a>

            {/* Contact info */}
            <div className="space-y-4">
              <a href="tel:+529382780560" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-sky/20 transition-colors">
                  <Phone size={16} className="text-brand-sky" />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {t("contacto.info_phone")}
                </span>
              </a>
              <a href={`mailto:${t("contacto.info_email")}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-sky/20 transition-colors">
                  <Mail size={16} className="text-brand-sky" />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {t("contacto.info_email")}
                </span>
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-sky/20 transition-colors">
                  <MapPin size={16} className="text-brand-sky" />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {t("contacto.info_address")}
                </span>
              </a>
            </div>

            {/* Social media */}
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                {t("contacto.social_title")}
              </p>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://www.facebook.com/tuzos.carmen",
                    icon: Facebook,
                    label: "Facebook",
                    bg: "hover:bg-[#1877f2]/20 hover:border-[#1877f2]/40",
                  },
                  {
                    href: "https://www.instagram.com/tuzoscdcarmen",
                    icon: Instagram,
                    label: "Instagram",
                    bg: "hover:bg-[#e1306c]/20 hover:border-[#e1306c]/40",
                  },
                  {
                    href: WHATSAPP_URL,
                    icon: MessageCircle,
                    label: "WhatsApp",
                    bg: "hover:bg-[#25D366]/20 hover:border-[#25D366]/40",
                  },
                ].map(({ href, icon: Icon, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all ${bg}`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right – contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                {t("contacto.form_name")}
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder={t("contacto.form_placeholder_name")}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                {t("contacto.form_email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder={t("contacto.form_placeholder_email")}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="message" className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                {t("contacto.form_message")}
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                placeholder={t("contacto.form_placeholder_message")}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-4 bg-brand-sky text-brand-deep dark:text-background font-semibold rounded-xl text-sm hover:opacity-90 active:scale-95 transition-all mt-2"
            >
              <Send size={16} />
              {sent ? "✓ Enviado" : t("contacto.form_submit")}
            </button>
          </form>
        </div>

        {/* Map section */}
        <div className="mt-20">
          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs font-bold text-white/25 uppercase tracking-widest">
              ✦
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Map card */}
          <div className="rounded-3xl border border-brand-sky/30 bg-[#07116b] dark:bg-[#0c1a40] overflow-hidden shadow-[0_0_0_1px_rgba(99,179,237,0.1),0_25px_60px_rgba(0,0,0,0.5)]">
            {/* Card header */}
            <div className="px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-sky/20 border border-brand-sky/30 text-brand-sky text-xs font-bold uppercase tracking-widest mb-3">
                  {t("contacto.map_section_badge")}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1">
                  {t("contacto.map_section_title")}
                </h3>
                <p className="text-sm text-white/50 flex items-center gap-1.5">
                  <MapPin size={13} className="text-brand-sky shrink-0" />
                  {t("contacto.info_address")}
                </p>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-sky text-brand-deep font-bold text-sm hover:opacity-90 active:scale-95 transition-all shrink-0 shadow-lg shadow-brand-sky/30"
              >
                <Navigation size={14} />
                {t("contacto.map_title")}
              </a>
            </div>

            {/* Map iframe */}
            <div className="relative w-full h-96">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: isDark
                    ? "invert(90%) hue-rotate(180deg) saturate(0.85) brightness(0.9)"
                    : "none",
                  transition: "filter 0.3s ease",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Tuzos Carmen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
