import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Akhil Handa | Former President & CDO |JPMorgan, Bank of Baroda, | Digital Banking Expert",
  description: "Akhil Handa's professional journey: Former President & Chief Digital Officer, led $300B bank digital transformation, served 200M+ customers, processed $1T+ annual payments. IIT Delhi alumnus, AI banking pioneer, fintech innovator.",
  keywords: [
    // Personal branding
    "Akhil Handa biography",
    "Akhil Handa background", 
    "Akhil Handa career",
    "Akhil Handa experience",
    "Akhil Handa achievements",
    
    // Professional titles and roles
    "Akhil Handa President Bank of Baroda",
    "Akhil Handa Chief Digital Officer",
    "Akhil Handa CDO",
    "Akhil Handa banking executive",
    "Akhil Handa digital transformation",
    
    // Company associations
    "Bank of Baroda Akhil Handa",
    "JPMorgan Akhil Handa",
    "bob World Akhil Handa",
    "IIT Delhi Akhil Handa",
    
    // Professional expertise
    "digital banking expert India",
    "AI banking leader",
    "fintech innovation expert",
    "banking transformation specialist",
    "digital payments expert",
    "mobile banking pioneer",
    "conversational banking expert",
    "open banking APIs expert",
    
    // Awards and recognition
    "Visionary Leader Financial Express Akhil Handa",
    "Best Chief Digital Officer Akhil Handa",
    "Top AI Leader India Akhil Handa",
    "Best Fintech Innovator Akhil Handa",
    "Digital Banking Product Awards Akhil Handa",
    
    // Industry influence
    "digital finance policy contributor",
    "fintech thought leader",
    "banking innovation speaker",
    "financial technology pioneer",
    "startup banking vertical creator",
    
    // Educational background
    "IIT Delhi banking",
    "IIT Delhi fintech",
    "engineering banking leader"
  ].join(", "),
  authors: [{ name: "Akhil Handa" }],
  creator: "Akhil Handa",
  publisher: "FirstHand by Akhil Handa",
  openGraph: {
    title: "About Akhil Handa | Former President & CDO  | JPMorgan, Bank of Baroda",
    description: "Former President & Chief Digital Officer| JPMorgan, Bank of Baroda, led digital transformation for $300B bank serving 200M+ customers. IIT Delhi alumnus, AI banking pioneer.",
    url: "https://firsthand.akhilhanda.com/about",
    siteName: "FirstHand by Akhil Handa",
    images: [
      {
        url: "https://firsthand.akhilhanda.com/akhil-handa-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Akhil Handa - Professional Profile and Background",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Akhil Handa | Former President & CDO Bank of Baroda",
    description: "Former President & CDO at Bank of Baroda, led digital transformation for $300B bank. IIT Delhi alumnus, AI banking pioneer, fintech innovator.",
    creator: "@akhilhanda",
    site: "@akhilhanda",
    images: ["https://firsthand.akhilhanda.com/akhil-handa-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://firsthand.akhilhanda.com/about",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 