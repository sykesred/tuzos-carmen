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
          src="/galeria/tuzos1"
          alt="Torneo UFD bienvenida"
          className="w-full h-64 object-cover rounded-2xl"
        />
        <img
          src="/galeria/tuzos2"
          alt="Primeras visorias en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
        <img
          src="/galeria/tuzos3"
          alt="Categoría Genuine en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos4"
          alt="Categopría Genuine en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos5"
          alt="Equipo Tuzos Carmen en torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos6"
          alt="Mascotas Tuzos Pachuca"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos7"
          alt="Entrenamiento en Tuzos Carmen"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos8"
          alt="Equipo Tuzos Carmen en estadio Hidalgo"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos9"
          alt="Equipo Tuzos Carmen en torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos10"
          alt="Equipo Tuzos Carmen en estadio Hidalgo"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos11"
          alt="Tuzito en torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
         <img
          src="/galeria/tuzos12"
          alt="Calentamiento para torneo UFD"
          className="w-full h-64 object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}