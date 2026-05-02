export default function GaleriaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Galería Tuzos Carmen
      </h1>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Ejemplo */}
        <img
          src="/galeria/img1.jpg"
          alt="Tuzos entrenamiento"
          className="w-full h-64 object-cover rounded-2xl"
        />
        <img
          src="/galeria/img2.jpg"
          alt="Partido"
          className="w-full h-64 object-cover rounded-2xl"
        />
        <img
          src="/galeria/img3.jpg"
          alt="Equipo"
          className="w-full h-64 object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}