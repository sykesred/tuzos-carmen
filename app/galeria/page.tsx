export default function GaleriaPage() {
  const images = [
    { src: "/images/galeria/tuzos1.jpg", alt: "Torneo UFD bienvenida" },
    { src: "/images/galeria/tuzos2.jpg", alt: "Primeras visorías en Tuzos Carmen" },
    { src: "/images/galeria/tuzos3.jpg", alt: "Categoría Genuine en Tuzos Carmen" },
    { src: "/images/galeria/tuzos4.jpg", alt: "Categoría Genuine en Tuzos Carmen" },
    { src: "/images/galeria/tuzos5.jpg", alt: "Equipo Tuzos Carmen en torneo UFD 2026" },
    { src: "/images/galeria/tuzos6.jpg", alt: "Mascotas Tuzos Pachuca" },
    { src: "/images/galeria/tuzos7.jpg", alt: "Equipo Tuzos Carmen entrenando" },
    { src: "/images/galeria/tuzos8.jpg", alt: "Equipo Tuzos Carmen en Estadio Hidalgo" },
    { src: "/images/galeria/tuzos9.jpg", alt: "Equipo Tuzos en torneo UFD 2026" },
    { src: "/images/galeria/tuzos10.jpg", alt: "Equipo Tuzos Carmen en Estadio Hidalgo" },
    { src: "/images/galeria/tuzos11.jpg", alt: "Tuzito en torneo UFD 2026" },
    { src: "/images/galeria/tuzos12.jpg", alt: "Equipo Tuzos Carmen entrenando para torneo UFD 2026" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Galería Tuzos Carmen
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  )
}