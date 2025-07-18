export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  image: string;
  videoUrl?: string; // Opcional - solo si existe se muestra el botón de video
  countries: string[]; // Lista de países donde aparece este testimonio
}

export const testimonials: Testimonial[] = [
  // Testimonios en inglés (US y CA)
  {
    id: "1",
    name: "Tim Johnson",
    location: "Hulk, Kansas",
    quote:
      "Cattler is great! I love it all the time. It has completely transformed how we manage our cattle operation and made everything so much more efficient.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/104CMT20240408LIMBAL.jpg-s9CtaxVQ4IkYrzBwKALTN6aPJAv0RH.jpeg",
    videoUrl: "https://youtu.be/NhVJQT8Yw98",
    countries: ["US", "CA"],
  },
  {
    id: "2",
    name: "Sarah Williams",
    location: "Texas Ranch",
    quote:
      "The real-time tracking and automated reporting have saved us countless hours. Cattler is an essential tool for modern ranching.",
    image: "/placeholder-user.jpg",
    // Sin videoUrl - no se mostrará el botón de video
    countries: ["US", "CA"],
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    location: "Colorado Feedlot",
    quote:
      "Since implementing Cattler, our feed efficiency has improved by 15% and our record-keeping is flawless. Highly recommend!",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example3",
    countries: ["US", "CA"],
  },
  {
    id: "4",
    name: "Robert Thompson",
    location: "Alberta Ranch",
    quote:
      "Cattler has revolutionized our cattle management. The efficiency gains are incredible and the support team is outstanding.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtu.be/NhVJQT8Yw98",
    countries: ["CA"],
  },
  {
    id: "5",
    name: "Jennifer MacDonald",
    location: "Saskatchewan Feedlot",
    quote:
      "The automated reporting features have saved us hours every week. Cattler is exactly what we needed for our operation.",
    image: "/placeholder-user.jpg",
    // Sin videoUrl - no se mostrará el botón de video
    countries: ["CA"],
  },

  // Testimonios en español (AR, PY, UY, BO, MX)
  {
    id: "6",
    name: "Carlos Mendoza",
    location: "Córdoba, Argentina",
    quote:
      "Cattler es increíble! Lo uso todo el tiempo. Ha transformado completamente cómo manejamos nuestra operación ganadera y ha hecho todo mucho más eficiente.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/104CMT20240408LIMBAL.jpg-s9CtaxVQ4IkYrzBwKALTN6aPJAv0RH.jpeg",
    videoUrl: "https://youtu.be/lNY3g69e_lE",
    countries: ["AR"],
  },
  {
    id: "7",
    name: "María González",
    location: "Estancia La Pampa",
    quote:
      "El seguimiento en tiempo real y los reportes automatizados nos han ahorrado incontables horas. Cattler es una herramienta esencial para la ganadería moderna.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: ["AR", "PY", "UY", "BO", "MX"],
  },
  {
    id: "8",
    name: "Roberto Silva",
    location: "Feedlot Buenos Aires",
    quote:
      "Desde que implementamos Cattler, nuestra eficiencia alimentaria mejoró un 15% y nuestros registros son impecables. ¡Altamente recomendado!",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example3",
    countries: ["AR", "PY", "UY", "BO", "MX"],
  },
  {
    id: "9",
    name: "José López",
    location: "Estancia Chaco",
    quote:
      "Cattler ha transformado nuestra gestión ganadera. La eficiencia que hemos logrado es increíble y el equipo de soporte es excepcional.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtu.be/lNY3g69e_lE",
    countries: ["PY"],
  },
  {
    id: "10",
    name: "Ana Martínez",
    location: "Estancia Paraguay",
    quote:
      "Los reportes automatizados nos han ahorrado horas cada semana. Cattler es exactamente lo que necesitábamos para nuestra operación.",
    image: "/placeholder-user.jpg",
    // Sin videoUrl - no se mostrará el botón de video
    countries: ["PY"],
  },
  {
    id: "11",
    name: "Fernando Rodríguez",
    location: "Estancia Tacuarembó",
    quote:
      "Cattler ha revolucionado nuestra gestión ganadera. Las ganancias en eficiencia son increíbles y el equipo de soporte es sobresaliente.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtu.be/lNY3g69e_lE",
    countries: ["UY"],
  },
  {
    id: "12",
    name: "Lucía Fernández",
    location: "Estancia Salto",
    quote:
      "Las funciones de reportes automatizados nos han ahorrado horas cada semana. Cattler es exactamente lo que necesitábamos.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: ["UY"],
  },
  {
    id: "13",
    name: "Luis Torres",
    location: "Estancia Santa Cruz",
    quote:
      "Cattler ha transformado completamente nuestra gestión ganadera. La eficiencia que hemos logrado es extraordinaria.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtu.be/lNY3g69e_lE",
    countries: ["BO"],
  },
  {
    id: "14",
    name: "Carmen Vargas",
    location: "Estancia Beni",
    quote:
      "Los reportes automatizados nos han ahorrado innumerables horas. Cattler es una herramienta esencial para la ganadería moderna.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: ["BO"],
  },
  {
    id: "15",
    name: "Miguel Hernández",
    location: "Rancho Sonora",
    quote:
      "Cattler es increíble! Lo uso todo el tiempo. Ha transformado completamente cómo manejamos nuestra operación ganadera.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtu.be/lNY3g69e_lE",
    countries: ["MX"],
  },
  {
    id: "16",
    name: "Isabel Morales",
    location: "Rancho Chihuahua",
    quote:
      "El seguimiento en tiempo real y los reportes automatizados nos han ahorrado incontables horas. Cattler es una herramienta esencial.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: ["MX"],
  },

  // Testimonios en portugués (BR)
  {
    id: "17",
    name: "João Silva",
    location: "Fazenda Mato Grosso",
    quote:
      "O Cattler é incrível! Eu uso o tempo todo. Transformou completamente como gerenciamos nossa operação pecuária e tornou tudo muito mais eficiente.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/104CMT20240408LIMBAL.jpg-s9CtaxVQ4IkYrzBwKALTN6aPJAv0RH.jpeg",
    videoUrl: "https://studio.youtube.com/video/JFxY4Oo92E8/edit",
    countries: ["BR"],
  },
  {
    id: "18",
    name: "Ana Santos",
    location: "Confinamento São Paulo",
    quote:
      "O rastreamento em tempo real e os relatórios automatizados nos pouparam inúmeras horas. O Cattler é uma ferramenta essencial para a pecuária moderna.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: ["BR"],
  },
  {
    id: "19",
    name: "Pedro Oliveira",
    location: "Fazenda Rio Grande do Sul",
    quote:
      "Desde que implementamos o Cattler, nossa eficiência alimentar melhorou 15% e nossos registros são impecáveis. Altamente recomendado!",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example3",
    countries: ["BR"],
  },
];

// Función helper para obtener testimonios por país
export function getTestimonialsByCountry(country: string): Testimonial[] {
  return testimonials.filter(testimonial => testimonial.countries.includes(country));
} 