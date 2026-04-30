"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { es } from "./es"
import { en } from "./en"

export type Lang = "es" | "en"

const translations = { es, en } as const

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
  tArr: (key: string) => string[]
  tObj: (key: string) => Record<string, string>
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es")

  useEffect(() => {
    const saved = localStorage.getItem("tuzos-lang") as Lang | null
    if (saved === "es" || saved === "en") setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem("tuzos-lang", l)
  }

  function resolve(key: string): unknown {
    const keys = key.split(".")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let val: any = translations[lang]
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return val
  }

  function t(key: string): string {
    const val = resolve(key)
    return typeof val === "string" ? val : key
  }

  function tArr(key: string): string[] {
    const val = resolve(key)
    return Array.isArray(val) ? (val as string[]) : []
  }

  function tObj(key: string): Record<string, string> {
    const val = resolve(key)
    return typeof val === "object" && val !== null && !Array.isArray(val)
      ? (val as Record<string, string>)
      : {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr, tObj }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider")
  return ctx
}

export function useSection<T>(sectionKey: keyof typeof es): T {
  const { lang } = useLanguage()
  return translations[lang][sectionKey] as unknown as T
}
