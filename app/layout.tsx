import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

// Updated metadata for SEO optimization
export const metadata = {
  title: "FirstHand by Akhil Handa | Digital Banking Evolution",
  description:
    "Akhil Handa's personal chronicle of digital banking evolution, fintech innovations, and emerging trends in financial services.",
  keywords: "Akhil Handa, digital banking, fintech, banking innovation, financial technology, FirstHand",
  openGraph: {
    title: "FirstHand by Akhil Handa | Digital Banking Evolution",
    description:
      "Akhil Handa's personal chronicle of digital banking evolution, fintech innovations, and emerging trends in financial services.",
    url: "https://firsthand.akhilhanda.com",
    siteName: "FirstHand by Akhil Handa",
    images: [
      {
        url: "https://firsthand.akhilhanda.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FirstHand by Akhil Handa",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstHand by Akhil Handa | Digital Banking Evolution",
    description:
      "Akhil Handa's personal chronicle of digital banking evolution, fintech innovations, and emerging trends in financial services.",
    creator: "@akhilhanda",
    images: ["https://firsthand.akhilhanda.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://firsthand.akhilhanda.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
