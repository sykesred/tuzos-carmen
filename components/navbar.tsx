"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/i18n/index.tsx"
import { cn } from "@/lib/utils"
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  MessageCircle,
} from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/529382780560?text=Hola%2C%20me%20interesa%20inscribir%20a%20mi%20hijo%20en%20Tuzos%20Carmen."

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  key: string
  label: string
  href?: string
  items?: DropdownItem[]
}

function useNavItems(): NavItem[] {
  const { t } = useLanguage()
  return [
    {
      key: "nosotros",
      label: t("nav.nosotros"),
      href: "/nosotros",
      items: [
        { label: t("nav.nosotros_items.mision"), href: "/nosotros#mision" },
        { label: t("nav.nosotros_items.grupo"), href: "/nosotros#grupo" },
        { label: t("nav.nosotros_items.torneos"), href: "/nosotros#torneos" },
        { label: t("nav.nosotros_items.equipo"), href: "/nosotros#equipo" },
        { label: t("nav.nosotros_items.visita"), href: "/nosotros#visita" },
      ],
    },
    {
      key: "categorias",
      label: t("nav.categorias"),
      href: "/categorias",
      items: [
        { label: t("nav.categorias_items.cat_4_5"), href: "/categorias#cat-4-5" },
        { label: t("nav.categorias_items.cat_6_7"), href: "/categorias#cat-6-7" },
        { label: t("nav.categorias_items.cat_8_9"), href: "/categorias#cat-8-9" },
        { label: t("nav.categorias_items.cat_10_11"), href: "/categorias#cat-10-11" },
        { label: t("nav.categorias_items.cat_12_13"), href: "/categorias#cat-12-13" },
        { label: t("nav.categorias_items.cat_14_15"), href: "/categorias#cat-14-15" },
        { label: t("nav.categorias_items.cat_sub18"), href: "/categorias#cat-sub18" },
        { label: t("nav.categorias_items.cat_sub18_tuzos"), href: "/categorias#cat-sub18-tuzos" },
        { label: t("nav.categorias_items.genuine"), href: "/categorias#genuine" },
      ],
    },
    {
      key: "convocatorias",
      label: t("nav.convocatorias"),
      href: "/convocatorias",
      items: [
        { label: t("nav.convocatorias_items.unete"), href: "/convocatorias#inscripcion" },
        { label: t("nav.convocatorias_items.visorias"), href: "/convocatorias#visorias" },
      ],
    },
    {
      key: "patrocinios",
      label: t("nav.patrocinios"),
      href: "/patrocinios",
    },
    {
      key: "contacto",
      label: t("nav.contacto"),
      href: "/contacto",
    },
  ]
}

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navItems = useNavItems()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  function handleMouseEnter(key: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(key)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Text colors adapt to whether navbar has a background or is transparent over dark hero
  const linkBase = scrolled
    ? "text-foreground/80 hover:text-primary hover:bg-muted"
    : "text-white/90 hover:text-white hover:bg-white/10"
  const linkActive = scrolled ? "text-primary bg-muted" : "text-white bg-white/15"
  const iconColor = scrolled ? "text-foreground/70 hover:text-primary hover:bg-muted" : "text-white/80 hover:text-white hover:bg-white/10"
  const borderColor = scrolled ? "border-border" : "border-white/25"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo-tuzos.png"
              alt="Tuzos Ciudad del Carmen"
              width={44}
              height={44}
              className={cn(
                "shrink-0 group-hover:scale-105 transition-transform drop-shadow-sm",
                scrolled ? "dark:mix-blend-lighten" : "mix-blend-lighten"
              )}
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className={cn(
                "font-heading font-black text-base leading-none transition-colors",
                scrolled ? "text-primary dark:text-primary" : "text-white"
              )}>
                Tuzos
              </span>
              <span className={cn(
                "text-[10px] font-medium leading-none transition-colors",
                scrolled ? "text-muted-foreground" : "text-white/60"
              )}>
                Cd. del Carmen
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map((item) =>
              item.items ? (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href ?? "#"}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      linkBase,
                      (activeDropdown === item.key || isActive(item.href ?? "")) && linkActive
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        activeDropdown === item.key && "rotate-180"
                      )}
                    />
                  </Link>

                  {/* Dropdown */}
                  {activeDropdown === item.key && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-150">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href!}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    linkBase,
                    isActive(item.href!) && linkActive
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors border",
                iconColor,
                borderColor
              )}
              aria-label="Toggle language"
            >
              {t("nav.language")}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn("p-2 rounded-lg transition-colors", iconColor)}
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </button>

            {/* CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <MessageCircle size={15} />
              {t("nav.inscribete")}
            </a>
          </div>

          {/* Mobile: language + theme + hamburger */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className={cn(
                "px-2 py-1 rounded-md text-xs font-bold transition-colors border",
                iconColor,
                borderColor
              )}
              aria-label="Toggle language"
            >
              {t("nav.language")}
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn("p-2 rounded-lg transition-colors", iconColor)}
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn("p-2 rounded-lg transition-colors", iconColor)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border shadow-lg max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) =>
              item.items ? (
                <div key={item.key}>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.key ? null : item.key
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-200",
                        mobileExpanded === item.key && "rotate-180"
                      )}
                    />
                  </button>
                  {mobileExpanded === item.key && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-sky pl-4 animate-in fade-in-0 duration-150">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-lg text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-primary transition-colors",
                    isActive(item.href!) && "text-primary bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Mobile CTA */}
            <div className="pt-2 pb-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
              >
                <MessageCircle size={16} />
                {t("nav.inscribete")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
