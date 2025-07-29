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
    name: "Chance Mclean",
    location: "Benedict, Nebraska",
    quote:
      "Cattler is a lot more user friendly than other traditional feedlot systems. On the go, at any location at the feedyard you are able to access it on the phone and make changes or add cattle or do anything, right there, by the palm of your hand. Even if you are not at the feedyard, you can check what's happening with the alerts.",
    image:
      "/testimonials/Chance-US.png",
    videoUrl: "https://www.youtube.com/watch?v=jf8eOAYhYok",
    countries: ["US", "CA", "OT$EN"],
  },
  {
    id: "2",
    name: "Matthew Rezac",
    location: "Onaga, Kansas",
    quote:
      "Cattler makes every day a little bit easier: keeps all your records, has your closeouts, your bunk scores, cattle movements are simple. It's so much easier to communicate with the guy in the feed truck. We have also been able to mark our cattle better, specially on the weight side, you have the average daily gain projection and the intent, and it keeps the weight to a pretty darn close number",
    image: "/testimonials/Matt-Rezac-US.jpg",
    countries: ["US", "CA", "OT$EN"],
  },
  {
    id: "3",
    name: "Dustin Brabec",
    location: "Clarkson, Nebraska",
    quote:
      "With Cattler I can feed the cattle and sit down 10 minutes in the evening and know all my numbers quickly. The program gave me more than I expected. For me Cattler is stress relief and being able to spend more time with my family.",
    image: "/testimonials/Brabec-US.jpg",
    videoUrl: "https://www.youtube.com/watch?v=DGH6yRO2JqY",
    countries: ["US", "CA", "OT$EN"],
  },
  {
    id: "4",
    name: "Kolby Rethman",
    location: "Holton, Kansas",
    quote:
      "Since we got into Cattler, we have everything recorded, tells us what to do. We keep lot more things in line. If my boss isn't here, he can go back and look what I doctored and what I gave in. It just make it a lot easier in here",
    image: "/testimonials/kolby-US.jpg",
    videoUrl: "https://www.youtube.com/watch?v=JFxY4Oo92E8",
    countries: ["US", "CA","OT$EN"],
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
    name: "Guillermo Vivas",
    location: "Cañuelas, Buenos Aires, Argentina",
    quote:
      "Probamos con otros software y nos costaba mucho adaptarnos, pero con Cattler andamos muy bien: es fácil, sencillo y práctico para todo el equipo. Nos permite manejar y monitorear de forma addecuada la alimentación del feedlot. Con muy poco tiempo al día podemos saber exactamente qué pasó el día anterior y lo que está ocurriendo en el momento y el stocok de insumos disponibles",
    image:
      "/testimonials/guillermo-vivas-AR.PNG",
    videoUrl: "",
    countries: ["AR","BO","PY","UY"],
  },
  {
    id: "7",
    name: "David Lilienfeld, Inducarne",
    location: "Santa Cruz, Bolivia",
    quote:
      "Probamos con varios programas y Cattler nos dio lo que necesitábamos: información precisa y puntual para tomar decisiones. Nos gusta la interfaz amigable e intuitiva, así com osu constante mejora y desarrollo. Siempre nos sorprenden con una nueva funcionalidad.",
    image: "/testimonials/david-lilienfeld-BO.jpg",
    videoUrl: "",
    countries: ["BO"],
  },
  {
    id: "8",
    name: "Ramón Otazu, Britos Hnos",
    location: "San José, Uruguay",
    quote:
      "Cattler nos permite manejar el feedlot a distancia, reduciendo los tiempos entre la carga de raciones y la entrega en los comederos. La información es accesible para todo el equipo, lo que es fundamental para nosotros, ya que priorizamos el trabajo colaborativo y contamos con el software como reaspaldo. Además, Cattler Actualiza constantemente sus funcionalidades, mejorando la dinámica del feedlot",
    image: "/testimonials/ramon-otazu-UY.jpg",
    videoUrl: "",
    countries: ["UY"],
  },
  {
    id: "9",
    name: "Juan Pablo Durán, Grupo Ceibos",
    location: "Río Negro, Uruguay",
    quote:
      "Con Cattler pudimos digitalizar todo el manejo de hacienda en los feedlots de Uruguay, y también va a ser nuestera aplicación pastoril. Para nosotros es una herramienta fundamental de eficiencia",
    image: "/testimonials/grupo-ceibos-UY.webp",
    videoUrl: "",
    countries: ["AR","UY"],
  },
  {
    id: "10",
    name: "Kiko Nazar Anchorena, La Nueva Trinidad",
    location: "Gobernador Mansilla, Entre Ríos, Argentina",
    quote:
      "Cattler integra toda la parte de producción de campo junto con la parte que antes se hacía en escritorio y se pasaba de planillas a papel. Hoy eso lo superamos con Cattler, todo queda automáticamente registrado en el sistema.",
    image: "/testimonials/kiko-nazar-AR.png",
    videoUrl: "",
    countries: ["AR"],
  },
  {
    id: "11",
    name: "Francisco Baumann, Ea Santa Catalina",
    location: "Huinca Renancó, Córdoba, Argentina",
    quote:
      "Con Cattler puedo monitorear lo que está pasanado en tiempo real desde el celular, sin estar en el campo todos los días. Veníamos trabajando con otra aplicación integrada al mixer, pero Cattler es mucho más completo y amigable. Nuestro mixero lo ama",
    image: "/testimonials/pancho-baumann-AR.jpg",
    videoUrl: "",
    countries: ["AR"],
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
    countries: [""],
  },
  {
    id: "14",
    name: "Carmen Vargas",
    location: "Estancia Beni",
    quote:
      "Los reportes automatizados nos han ahorrado innumerables horas. Cattler es una herramienta esencial para la ganadería moderna.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: [""],
  },
  {
    id: "15",
    name: "Miguel Hernández",
    location: "Rancho Sonora",
    quote:
      "Cattler es increíble! Lo uso todo el tiempo. Ha transformado completamente cómo manejamos nuestra operación ganadera.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtu.be/lNY3g69e_lE",
    countries: [""],
  },
  {
    id: "16",
    name: "Isabel Morales",
    location: "Rancho Chihuahua",
    quote:
      "El seguimiento en tiempo real y los reportes automatizados nos han ahorrado incontables horas. Cattler es una herramienta esencial.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: [""],
  },

  // Testimonios en portugués (BR)
  {
    id: "17",
    name: "David Lilienfeld, Inducarne",
    location: "Santa Cruz, Bolivia",
    quote:
      "Testamos vários programas e o Cattler foi o que nos deu o que precisávamos: informações precisas e pontuais para tomar decisões. Gostamos da interface amigável e intuitiva, assim como das constantes melhorias e inovações. Sempre nos surpreendem com uma nova funcionalidade.",
    image:"/testimonials/david-lilienfeld-BO.jpg",
    videoUrl: "",
    countries: ["BR"],
  },
  {
    id: "18",
    name: "Ana Santos",
    location: "Confinamento São Paulo",
    quote: "O rastreamento em tempo real e os relatórios automatizados nos pouparam inúmeras horas. O Cattler é uma ferramenta essencial para a pecuária moderna.",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    countries: [""],
  },
  {
    id: "19",
    name: "Pedro Oliveira",
    location: "Fazenda Rio Grande do Sul",
    quote:
      "Desde que implementamos o Cattler, nossa eficiência alimentar melhorou 15% e nossos registros são impecáveis. Altamente recomendado!",
    image: "/placeholder-user.jpg",
    videoUrl: "https://youtube.com/watch?v=example3",
    countries: [""],
  },
];

// Función helper para obtener testimonios por país
export function getTestimonialsByCountry(country: string): Testimonial[] {
  return testimonials.filter(testimonial => testimonial.countries.includes(country));
} 