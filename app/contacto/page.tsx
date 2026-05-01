import { ContactoSection } from "@/components/contacto-section"

export const metadata = {
  title: "Contacto | Tuzos Carmen",
  description:
    "Contáctanos por WhatsApp o formulario. Escuela Tuzos Carmen en Ciudad del Carmen, Campeche.",
}

export default function ContactoPage() {
  return (
    <main className="pt-16 bg-brand-deep dark:bg-card">
      <ContactoSection />
    </main>
  )
}
