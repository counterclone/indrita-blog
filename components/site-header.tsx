"use client"

import Link from "next/link"
import { Menu, XIcon, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"
import { LogoModern } from "@/components/logo-modern"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-gray-100 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-0">
        <Link href="/" className="flex items-center gap-4 py-2">
          <LogoModern size={48} />
          <span className="text-3xl font-bold tracking-tight text-gray-900">FirstHand</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-gray-900 hover:text-blue-600">
            Home
          </Link>
          <Link href="/thoughts" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Thoughts
          </Link>
          <Link href="/articles" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Articles
          </Link>
          <Link href="/gallery" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Gallery
          </Link>
          {/* <Link href="/quick-takes" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Quick Takes
          </Link> */}
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            About Me
          </Link>
          <Link href="/contact" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <Link href="https://x.com/akhilhanda12" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-gray-500 hover:text-black"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link href="https://linkedin.com/in/akhilh" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-gray-500 hover:text-blue-700" />
            </Link>
          </div>
          <button 
            className="md:hidden flex items-center gap-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="text-sm font-medium">Menu</span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-white shadow-md border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="font-medium">Akhil Handa</span>
              <p className="text-xs text-gray-500">Digital Banking Strategist</p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/thoughts"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Thoughts
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/gallery"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/quick-takes"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Quick Takes
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex gap-4 mt-4 justify-center">
              <Link href="https://x.com/akhilhanda12" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-gray-500 hover:text-black"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link href="https://linkedin.com/in/akhilh" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-gray-500 hover:text-blue-700" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
