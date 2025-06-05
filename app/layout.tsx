import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { TwitterScript } from "@/components/twitter-script"
import GoogleAnalytics from '@/components/google-analytics'
import { PersonStructuredData, OrganizationStructuredData, WebsiteStructuredData } from '@/components/structured-data'

const inter = Inter({ subsets: ["latin"] })

// Updated metadata for SEO optimization
export const metadata = {
  title: "Akhil Handa | Digital Banking Leader & Former Chief Digital Officer | FirstHand",
  description:
    "Akhil Handa, former President & Chief Digital Officer at Bank of Baroda, shares firsthand insights on digital banking evolution, fintech innovations, and AI in financial services. Led transformation for 200M+ customers.",
  keywords: [
    "Akhil Handa",
    "Akhil Handa digital banking", 
    "Akhil Handa Bank of Baroda",
    "Akhil Handa CDO",
    "Chief Digital Officer banking",
    "digital banking transformation",
    "fintech innovation",
    "AI banking leader",
    "FirstHand Akhil Handa",
    "banking digitization expert",
    "mobile banking pioneer",
    "digital payments expert",
    "IIT Delhi banking",
    "Bank of Baroda digital transformation"
  ].join(", "),
  authors: [{ name: "Akhil Handa" }],
  creator: "Akhil Handa",
  publisher: "FirstHand by Akhil Handa",
  applicationName: "FirstHand by Akhil Handa",
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Akhil Handa | Digital Banking Leader & Former Chief Digital Officer",
    description:
      "Former President & Chief Digital Officer at Bank of Baroda. Expert insights on digital banking evolution, fintech innovations, and AI in financial services.",
    url: "https://firsthand.akhilhanda.com",
    siteName: "FirstHand by Akhil Handa",
    images: [
      {
        url: "https://firsthand.akhilhanda.com/akhil-handa-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Akhil Handa - Digital Banking Leader and Former Chief Digital Officer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhil Handa | Digital Banking Leader & Former CDO",
    description:
      "Former President & CDO at Bank of Baroda. Expert insights on digital banking evolution, fintech innovations, and AI in financial services.",
    creator: "@akhilhanda",
    site: "@akhilhanda",
    images: ["https://firsthand.akhilhanda.com/akhil-handa-profile.jpg"],
  },
  alternates: {
    canonical: "https://firsthand.akhilhanda.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <TwitterScript />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <PersonStructuredData />
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`} suppressHydrationWarning>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <SiteHeader />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
