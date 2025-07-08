export interface PartnerLogo {
  id: string
  name: string
  logoUrl: string
  website?: string
  category: "producer" | "technology" | "investor" | "partner"
}

export interface CountryLogos {
  [key: string]: PartnerLogo[]
}

export const partnerLogos: CountryLogos = {
  US: [
    {
      id: "us-1",
      name: "American Cattle Association",
      logoUrl: "elanco.png",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "us-2",
      name: "Texas Beef Council",
      logoUrl: "/placeholder.svg?height=60&width=120&text=TBC",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "us-3",
      name: "Midwest Feedlots",
      logoUrl: "/placeholder.svg?height=60&width=120&text=MF",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "us-4",
      name: "AgTech Ventures",
      logoUrl: "/placeholder.svg?height=60&width=120&text=ATV",
      website: "https://example.com",
      category: "investor",
    },
    {
      id: "us-5",
      name: "Ranch Management Systems",
      logoUrl: "/placeholder.svg?height=60&width=120&text=RMS",
      website: "https://example.com",
      category: "technology",
    },
    {
      id: "us-6",
      name: "Cattle Tech Solutions",
      logoUrl: "/placeholder.svg?height=60&width=120&text=CTS",
      website: "https://example.com",
      category: "partner",
    },
  ],
  AR: [
    {
      id: "ar-1",
      name: "Asociación Argentina de Ganaderos",
      logoUrl: "/placeholder.svg?height=60&width=120&text=AAG",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "ar-2",
      name: "Feedlot Córdoba",
      logoUrl: "/placeholder.svg?height=60&width=120&text=FC",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "ar-3",
      name: "Pampa Beef",
      logoUrl: "/placeholder.svg?height=60&width=120&text=PB",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "ar-4",
      name: "AgTech Argentina",
      logoUrl: "/placeholder.svg?height=60&width=120&text=ATA",
      website: "https://example.com",
      category: "technology",
    },
    {
      id: "ar-5",
      name: "Inversiones Ganaderas",
      logoUrl: "/placeholder.svg?height=60&width=120&text=IG",
      website: "https://example.com",
      category: "investor",
    },
    {
      id: "ar-6",
      name: "Sistemas Rurales",
      logoUrl: "/placeholder.svg?height=60&width=120&text=SR",
      website: "https://example.com",
      category: "partner",
    },
  ],
  BR: [
    {
      id: "br-1",
      name: "Associação Brasileira de Pecuária",
      logoUrl: "/placeholder.svg?height=60&width=120&text=ABP",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "br-2",
      name: "Confinamento Mato Grosso",
      logoUrl: "/placeholder.svg?height=60&width=120&text=CMG",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "br-3",
      name: "Fazenda São Paulo",
      logoUrl: "/placeholder.svg?height=60&width=120&text=FSP",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "br-4",
      name: "TechAgro Brasil",
      logoUrl: "/placeholder.svg?height=60&width=120&text=TAB",
      website: "https://example.com",
      category: "technology",
    },
    {
      id: "br-5",
      name: "Investimentos Rurais",
      logoUrl: "/placeholder.svg?height=60&width=120&text=IR",
      website: "https://example.com",
      category: "investor",
    },
    {
      id: "br-6",
      name: "Soluções Pecuárias",
      logoUrl: "/placeholder.svg?height=60&width=120&text=SP",
      website: "https://example.com",
      category: "partner",
    },
  ],
  // Default logos for other countries
  default: [
    {
      id: "def-1",
      name: "Global Cattle Alliance",
      logoUrl: "/placeholder.svg?height=60&width=120&text=GCA",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "def-2",
      name: "International Feedlot Association",
      logoUrl: "/placeholder.svg?height=60&width=120&text=IFA",
      website: "https://example.com",
      category: "producer",
    },
    {
      id: "def-3",
      name: "AgTech Global",
      logoUrl: "/placeholder.svg?height=60&width=120&text=ATG",
      website: "https://example.com",
      category: "technology",
    },
    {
      id: "def-4",
      name: "Livestock Solutions",
      logoUrl: "/placeholder.svg?height=60&width=120&text=LS",
      website: "https://example.com",
      category: "partner",
    },
    {
      id: "def-5",
      name: "Ranch Tech International",
      logoUrl: "/placeholder.svg?height=60&width=120&text=RTI",
      website: "https://example.com",
      category: "technology",
    },
    {
      id: "def-6",
      name: "Cattle Management Pro",
      logoUrl: "/placeholder.svg?height=60&width=120&text=CMP",
      website: "https://example.com",
      category: "partner",
    },
  ],
}

export function getLogosForCountry(countryCode: string): PartnerLogo[] {
  return partnerLogos[countryCode] || partnerLogos.default
}
