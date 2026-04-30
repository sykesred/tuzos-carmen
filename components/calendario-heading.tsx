"use client"

import { useLanguage } from "@/lib/i18n/index.tsx"

export function CalendarioHeading() {
  const { t } = useLanguage()
  return (
    <h2 className="text-3xl font-bold text-center mb-6">
      {t("convocatorias.calendario_title")}
    </h2>
  )
}
