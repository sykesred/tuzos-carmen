"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/index"
import { es } from "@/lib/i18n/es"
import { en } from "@/lib/i18n/en"
import { Heart, MapPin, Globe, Check, BookOpen, GraduationCap } from "lucide-react"

// ─── Torneos carousel gradients ────────────────────────────────
const TORNEO_GRADIENTS = [
  "from-[#ed742e] to-[#c55a1f]",
  "from-[#0b2472] to-[#1a3ab0]",
  "from-[#c55a1f] to-[#0b2472]",
  "from-[#1a3ab0] to-[#ed742e]",
  "from-[#0b2472]/80 to-[#c55a1f]",
]

// ─── Animated soccer balls ──────────────────────────────────────
const BALL_VARIANTS = [
  { bg: "#ed742e", patch: "#0b2472", stroke: "#0b2472" },
  { bg: "#0b2472", patch: "#ed742e", stroke: "#ffffff" },
  { bg: "#ffffff", patch: "#0b2472", stroke: "#0b2472" },
]

const BALLS = [
  { id: 0, size: 45, left: "4%", delay: "0s", dur: "8s", drift: 0 },
  { id: 1, size: 28, left: "12%", delay: "2.4s", dur: "11s", drift: 1 },
  { id: 2, size: 55, left: "21%", delay: "0.8s", dur: "9.5s", drift: -1 },
  { id: 3, size: 32, left: "33%", delay: "1.5s", dur: "12s", drift: 0 },
  { id: 4, size: 60, left: "45%", delay: "3.2s", dur: "10s", drift: 1 },
  { id: 5, size: 38, left: "57%", delay: "0.4s", dur: "13s", drift: -1 },
  { id: 6, size: 42, left: "67%", delay: "2.1s", dur: "8.5s", drift: 1 },
  { id: 7, size: 50, left: "78%", delay: "1.2s", dur: "11s", drift: 0 },
  { id: 8, size: 35, left: "88%", delay: "3.8s", dur: "9.5s", drift: -1 },
  { id: 9, size: 25, left: "93%", delay: "0.9s", dur: "14s", drift: 0 },
  { id: 10, size: 48, left: "28%", delay: "4.5s", dur: "10.5s", drift: 1 },
  { id: 11, size: 65, left: "72%", delay: "2.8s", dur: "7.5s", drift: -1 },
  { id: 12, size: 30, left: "50%", delay: "5.1s", dur: "12.5s", drift: 0 },
  { id: 13, size: 40, left: "8%", delay: "3.6s", dur: "9s", drift: 1 },
  { id: 14, size: 52, left: "40%", delay: "1.9s", dur: "11.5s", drift: -1 },
]

function SoccerBallSVG({ ball }: { ball: typeof BALLS[number] }) {
  const variant = BALL_VARIANTS[ball.id % BALL_VARIANTS.length]
  const clipId = `ball-clip-${ball.id}`

  return (
    <svg viewBox="0 0 100 100" width={ball.size} height={ball.size}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="47" />
        </clipPath>
      </defs>

      <circle cx="50" cy="50" r="47" fill={variant.bg} />

      <g clipPath={`url(#${clipId})`} fill={variant.patch}>
        <polygon points="50,24 66,36 60,55 40,55 34,36" />
      </g>

      <circle cx="50" cy="50" r="47" fill="none" stroke={variant.stroke} strokeWidth="2.5" />
    </svg>
  )
}

function AnimatedBalls() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {BALLS.map((ball) => (
        <div key={ball.id}>
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

  // ─── Torneos carousel ─────────────────────────
  const torneosTotal = data.torneos_items.length
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % torneosTotal)
    }, 3500)

    return () => clearInterval(timer)
  }, [torneosTotal])

  const moveTorneo = (dir: "prev" | "next") => {
    setActiveIdx((i) =>
      dir === "next"
        ? (i + 1) % torneosTotal
        : (i - 1 + torneosTotal) % torneosTotal
    )
  }

  return (
    <div>
      {/* TODO tu contenido original sigue aquí sin cambios */}
    </div>
  )
}