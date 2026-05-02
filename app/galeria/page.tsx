function AnimatedBalls() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 25 + 20
        const duration = Math.random() * 8 + 6
        const delay = Math.random() * 5

        return (
          <span
            key={i}
            className="absolute animate-fall text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            ⚽
          </span>
        )
      })}
    </div>
  )
}

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

  const BALL_VARIANTS = [
  { bg: "#ed742e", patch: "#0b2472", stroke: "#0b2472" },
  { bg: "#0b2472", patch: "#ed742e", stroke: "#ffffff" },
  { bg: "#ffffff", patch: "#0b2472", stroke: "#0b2472" },
]

const BALLS = [
  { id: 0,  size: 45, left: "4%",  delay: "0s",    dur: "8s",    drift: 0  },
  { id: 1,  size: 28, left: "12%", delay: "2.4s",  dur: "11s",   drift: 1  },
  { id: 2,  size: 55, left: "21%", delay: "0.8s",  dur: "9.5s",  drift: -1 },
  { id: 3,  size: 32, left: "33%", delay: "1.5s",  dur: "12s",   drift: 0  },
  { id: 4,  size: 60, left: "45%", delay: "3.2s",  dur: "10s",   drift: 1  },
  { id: 5,  size: 38, left: "57%", delay: "0.4s",  dur: "13s",   drift: -1 },
  { id: 6,  size: 42, left: "67%", delay: "2.1s",  dur: "8.5s",  drift: 1  },
  { id: 7,  size: 50, left: "78%", delay: "1.2s",  dur: "11s",   drift: 0  },
  { id: 8,  size: 35, left: "88%", delay: "3.8s",  dur: "9.5s",  drift: -1 },
  { id: 9,  size: 25, left: "93%", delay: "0.9s",  dur: "14s",   drift: 0  },
  { id: 10, size: 48, left: "28%", delay: "4.5s",  dur: "10.5s", drift: 1  },
  { id: 11, size: 65, left: "72%", delay: "2.8s",  dur: "7.5s",  drift: -1 },
  { id: 12, size: 30, left: "50%", delay: "5.1s",  dur: "12.5s", drift: 0  },
  { id: 13, size: 40, left: "8%",  delay: "3.6s",  dur: "9s",    drift: 1  },
  { id: 14, size: 52, left: "40%", delay: "1.9s",  dur: "11.5s", drift: -1 },
]

 return (
  <div className="relative min-h-screen bg-[#0b2472] text-white px-6 pt-36 pb-16 overflow-hidden">

    {/* ⚽ BALONES */}
    <AnimatedBalls />

    {/* CONTENIDO */}
    <div className="relative z-10">

      {/* TÍTULO */}
      <h1 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-white to-[#ed742e] bg-clip-text text-transparent">
        Galería Tuzos Carmen
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl shadow-xl">

            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 active:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-white font-semibold text-sm">
                {img.alt}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  </div>
)}