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
          src="/galeria/tuzos1.jpg"
          alt="Torneo UFD bienvenida"
          className="w-full h-64 object-cover rounded-2xl"
        />
        <img
          src="/galeria/tuzos2.jpg"
          alt="Primeras visorias en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
        <img
          src="/galeria/tuzos3.jpg"
          alt="Categoría Genuine en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos4.jpg"
          alt="Categopría Genuine en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos5.jpg"
          alt="Equipo Tuzos Carmen en torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos6.jpg"
          alt="Mascotas Tuzos Pachuca"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos7.jpg"
          alt="Entrenamiento en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos8.jpg"
          alt="Equipo Tuzos Carmen en estadio Hidalgo"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos9.jpg"
          alt="Equipo Tuzos Carmen en torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos10.jpg"
          alt="Equipo Tuzos Carmen en estadio Hidalgo"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos11.jpg"
          alt="Tuzito en torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos12.jpg"
          alt="Calentamiento para torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}