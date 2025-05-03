import Link from "next/link"
import { Linkedin } from "lucide-react"
import { LogoModern } from "@/components/logo-modern"

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LogoModern size={24} />
              <span className="text-sm font-medium">FirstHand</span>
            </div>
            <p className="text-sm text-gray-500">
              My attempt to chronicle the evolution of digital platforms in banking and adjacent markets.
            </p>
            <div className="flex gap-4 mt-4">
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
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/thoughts" className="text-sm text-gray-500 hover:text-blue-600">
                  Thoughts
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-sm text-gray-500 hover:text-blue-600">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-gray-500 hover:text-blue-600">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-blue-600">
                  About Me
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topics/ai" className="text-sm text-gray-500 hover:text-blue-600">
                  AI in Banking
                </Link>
              </li>
              <li>
                <Link href="/topics/fintech" className="text-sm text-gray-500 hover:text-blue-600">
                  Fintech Innovation
                </Link>
              </li>
              <li>
                <Link href="/topics/digital" className="text-sm text-gray-500 hover:text-blue-600">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link href="/topics/regulation" className="text-sm text-gray-500 hover:text-blue-600">
                  Regulation & Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Connect</h3>
            <p className="text-sm text-gray-500 mb-3">
              Follow my journey through the evolving landscape of digital banking.
            </p>
            <Link href="/subscribe" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Subscribe to updates →
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Akhil Handa. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-blue-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-blue-600">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
