"use client"

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { X, Send, Globe, Phone } from "lucide-react"
import Image from "next/image"

/* ─── Types ─────────────────────────────────────────────────── */

type Lang = "es" | "en"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

/* ─── Constants ─────────────────────────────────────────────── */

const WELCOME: Record<Lang, string> = {
  es: "¡Hola! Soy **Tuzito** ⚽, tu asistente oficial de la Escuela Tuzos Carmen.\n\n¿En qué puedo ayudarte?\n• Categorías y edades\n• Inscripciones\n• Torneos\n• Horarios y ubicación",
  en: "Hi there! I'm **Tuzito** ⚽, your official assistant from Escuela Tuzos Carmen.\n\nHow can I help you?\n• Categories and ages\n• Enrollment\n• Tournaments\n• Schedules and location",
}

const PLACEHOLDER: Record<Lang, string> = {
  es: "Escribe tu pregunta…",
  en: "Type your question…",
}

const TYPING_LABEL: Record<Lang, string> = {
  es: "Tuzito está escribiendo",
  en: "Tuzito is typing",
}

const LANG_SWITCH: Record<Lang, string> = {
  es: "EN",
  en: "ES",
}

/* ─── Helpers ───────────────────────────────────────────────── */

function uid() {
  return Math.random().toString(36).slice(2)
}

function renderContent(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .split("\n")
    .map((line, i) => {
      const trimmed = line.trim()
      if (trimmed.startsWith("•")) {
        return `<span class="flex gap-1.5 items-start"><span class="mt-1 shrink-0 text-orange-400">•</span><span>${trimmed.slice(1).trim()}</span></span>`
      }
      if (i > 0 && trimmed === "") return "<br/>"
      return trimmed
    })
    .filter(Boolean)
    .join("")
}

/* ─── Component ─────────────────────────────────────────────── */

export function TuzitoChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [lang, setLang] = useState<Lang>("es")
  const [hasBadge, setHasBadge] = useState(false)

  /* Drag ─────────────────────────────────────────────────────── */
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const drag = useRef({
    active: false,
    startClientX: 0,
    startClientY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    moved: false,
  })

  /* Refs ─────────────────────────────────────────────────────── */
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Auto-scroll ──────────────────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  /* Focus & badge ────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setHasBadge(false)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  /* Welcome message on first open ────────────────────────────── */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: "welcome", role: "assistant", content: WELCOME[lang] }])
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  /* Drag handlers ────────────────────────────────────────────── */
  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      drag.current = {
        active: true,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startOffsetX: dragOffset.x,
        startOffsetY: dragOffset.y,
        moved: false,
      }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    },
    [dragOffset],
  )

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startClientX
    const dy = e.clientY - drag.current.startClientY
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) drag.current.moved = true
    if (drag.current.moved) {
      setDragOffset({
        x: drag.current.startOffsetX + dx,
        y: drag.current.startOffsetY + dy,
      })
    }
  }, [])

  const onPointerUp = useCallback(() => {
    if (!drag.current.moved) setIsOpen((o) => !o)
    drag.current.active = false
  }, [])

  /* Send message ─────────────────────────────────────────────── */
  const sendMessage = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault()
      const text = input.trim()
      if (!text || isTyping) return

      const userMsg: Message = { id: uid(), role: "user", content: text }
      const nextMessages = [...messages, userMsg]
      setMessages(nextMessages)
      setInput("")
      setIsTyping(true)

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.slice(-12).map((m) => ({
              role: m.role,
              content: m.content,
            })),
            lang,
          }),
        })

        const { reply } = await res.json()
        const botMsg: Message = { id: uid(), role: "assistant", content: reply }
        setMessages((prev) => [...prev, botMsg])
        if (!isOpen) setHasBadge(true)
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content:
              lang === "es"
                ? "Lo siento, tuve un problema. Contáctanos por WhatsApp al 938 278 0560 📱"
                : "Sorry, I had an issue. Contact us via WhatsApp at 938 278 0560 📱",
          },
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [input, isTyping, messages, lang, isOpen],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [sendMessage],
  )

  const toggleLang = useCallback(() => {
    const next: Lang = lang === "es" ? "en" : "es"
    setLang(next)
    if (messages.length === 1 && messages[0].id === "welcome") {
      setMessages([{ id: "welcome", role: "assistant", content: WELCOME[next] }])
    }
  }, [lang, messages])

  /* ─── Render ────────────────────────────────────────────────── */
  return (
    <div
      className="fixed bottom-5 right-5 z-9990 flex flex-col items-end gap-3 select-none"
      style={{ transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)` }}
    >
      {/* ── Chat window ─────────────────────────────────────────── */}
      {isOpen && (
        <>
          {/* Backdrop — invisible, solo captura clics fuera del chat */}
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            className="animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-300
                       w-[min(92vw,400px)] h-140 max-h-[80vh]
                       flex flex-col rounded-3xl overflow-hidden
                       shadow-2xl shadow-black/25 border border-white/20"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Chat con Tuzito"
          >
            {/* Header */}
            <header className="shrink-0 bg-[#ed742e] px-4 py-3 flex items-center gap-3">
              {/* Avatar */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 shrink-0 shadow-md">
                <Image
                  src="/tuzito.png"
                  alt="Tuzito"
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Name & status */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm leading-tight">Tuzito</p>
                <p className="text-white/65 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  {lang === "es" ? "Asistente Tuzos" : "Tuzos Assistant"}
                </p>
              </div>

              {/* Language toggle */}
              <button
                onClick={toggleLang}
                title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white text-xs font-bold"
              >
                <Globe size={11} />
                {LANG_SWITCH[lang]}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
              >
                <X size={15} />
              </button>
            </header>

            {/* Blue accent line */}
            <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#0b2472] to-transparent shrink-0" />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Bot avatar */}
                  {msg.role === "assistant" && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm mt-0.5 border border-slate-200 dark:border-slate-700">
                      <Image
                        src="/tuzito.png"
                        alt="Tuzito"
                        fill
                        className="object-cover"
                        draggable={false}
                      />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-linear-to-br from-[#ed742e] to-[#0b2472] text-white rounded-tr-sm shadow-md shadow-orange-500/20"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700"
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                  />
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 items-end">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                    <Image src="/tuzito.png" alt="Tuzito" fill className="object-cover" draggable={false} />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 mr-1 italic">{TYPING_LABEL[lang]}…</span>
                    <span className="w-1.5 h-1.5 bg-[#ed742e] rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-[#ed742e] rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-[#ed742e] rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="shrink-0 px-3 py-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-2 items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={PLACEHOLDER[lang]}
                disabled={isTyping}
                aria-label={PLACEHOLDER[lang]}
                className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#ed742e]/40 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label={lang === "es" ? "Enviar mensaje" : "Send message"}
                className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#f97316] to-[#ea580c] text-white flex items-center justify-center shrink-0 hover:opacity-90 disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-500/30"
              >
                <Send size={16} />
              </button>
            </form>

            {/* Footer */}
            <div className="shrink-0 py-1.5 bg-white dark:bg-slate-800 flex items-center justify-center gap-2">
              <span className="text-[10px] text-slate-400">
                {lang === "es" ? "¿Necesitas ayuda?" : "Need help?"}
              </span>
              <a
                href="https://wa.me/5219382780560"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-semibold text-[#ed742e] hover:text-[#0b2472] transition-colors"
              >
                <Phone size={9} />
                WhatsApp 938 278 0560
              </a>
            </div>
          </div>
        </>
      )}

      {/* ── Launcher button ──────────────────────────────────────── */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className={`relative w-16 h-16 rounded-full cursor-pointer touch-none
                   transition-transform duration-200
                   ${!drag.current.moved ? "hover:scale-110 active:scale-95" : "cursor-grabbing"}`}
        role="button"
        aria-label={isOpen ? "Cerrar Tuzito" : "Abrir chat con Tuzito"}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen((o) => !o)}
      >
        {/* Glow ring (only when closed) */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: "radial-gradient(circle, #ed742e 0%, #0b2472 100%)" }}
          />
        )}

        {/* Button face */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-[#ed742e] shadow-xl shadow-black/30"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #0b2472, #ed742e)"
              : undefined,
          }}
        >
          {isOpen ? (
            <div className="w-full h-full flex items-center justify-center text-white">
              <X size={26} />
            </div>
          ) : (
            <Image
              src="/tuzito.png"
              alt="Abrir chat con Tuzito"
              fill
              className="object-cover"
              draggable={false}
            />
          )}
        </div>

        {/* Notification badge */}
        {hasBadge && !isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />
        )}
      </div>
    </div>
  )
}
