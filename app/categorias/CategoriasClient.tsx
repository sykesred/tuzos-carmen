"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { CategoriasSection } from "@/components/categorias-section"
import BookingCalendar from "@/app/components/BookingCalendar"
import { CalendarioHeading } from "@/components/calendario-heading"

export default function CategoriasClient() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      const el = document.querySelector(hash)

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" })
        }, 200)
      }
    }
  }, [searchParams])

  return (
    <>
      {/* Categorías */}
      <CategoriasSection />

      {/* Calendario */}
      <section
        id="agenda-clase"
        className="py-16 bg-gray-50 dark:bg-background scroll-mt-32"
      >
        <div className="max-w-5xl mx-auto px-4">
          <CalendarioHeading />
          <BookingCalendar />
        </div>
      </section>
    </>
  )
}