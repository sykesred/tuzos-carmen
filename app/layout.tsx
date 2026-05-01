import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n/index'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TuzitoChat } from '@/components/tuzito/TuzitoChat'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tuzos Carmen | Escuela de Fútbol Juvenil',
  description:
    'Escuela filial oficial de Tuzos Pachuca en Ciudad del Carmen, Campeche. Formación deportiva profesional para niños y jóvenes de 4 a 18 años.',
  keywords: [
    'Tuzos',
    'fútbol juvenil',
    'escuela de fútbol',
    'Ciudad del Carmen',
    'Campeche',
    'Tuzos Pachuca',
  ],
  authors: [{ name: 'Tuzos Carmen' }],
  openGraph: {
    title: 'Tuzos Carmen | Escuela de Fútbol Juvenil',
    description:
      'Formamos campeones dentro y fuera de la cancha. Categorías de 4 a 15 años.',
    locale: 'es_MX',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#050c9c' },
    { media: '(prefers-color-scheme: dark)', color: '#0a2647' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className="bg-background scroll-smooth"
    >
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
            <TuzitoChat />
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
