import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { getSystemPrompt, type TuzitoLang } from "@/lib/tuzito-prompt"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

type ChatMessage = { role: "user" | "assistant"; content: string }

const FALLBACK: Record<TuzitoLang, string> = {
  es: "Lo siento, tuve un problema técnico. Por favor contáctanos por WhatsApp al 938 278 0560 📱",
  en: "Sorry, I had a technical issue. Please contact us via WhatsApp at 938 278 0560 📱",
}

export async function POST(req: NextRequest) {
  let lang: TuzitoLang = "es"

  try {
    const body = await req.json()
    const messages: ChatMessage[] = body.messages ?? []
    lang = body.lang === "en" ? "en" : "es"

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: getSystemPrompt(lang) },
        ...messages.slice(-12),
      ],
      max_tokens: 300,
      temperature: 0.75,
    })

    const reply =
      completion.choices[0]?.message?.content?.trim() ?? FALLBACK[lang]

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("[Tuzito API] Error:", error)
    return NextResponse.json({ reply: FALLBACK[lang] }, { status: 200 })
  }
}
