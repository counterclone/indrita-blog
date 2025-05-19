"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Globe, TrendingUp, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

// Futuristic terminal component with global banking focus
const FuturisticTerminal = () => {
  const [text, setText] = useState("")
  const fullText = `> Analyzing cross-border payment flows\n> Monitoring global settlement systems\n> Evaluating international credit models\n> Optimizing multi-currency platforms\n> Tracking remittance corridors: US-India-UAE\n> Forecasting FX volatility trends`
  const typingSpeed = 50

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="font-mono text-xs sm:text-sm bg-gray-900 text-green-500 p-4 rounded-lg h-32 overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 text-xs ml-2">fintech-opportunities.sh</span>
      </div>
      <pre className="whitespace-pre-wrap">{text}</pre>
      <div className="h-4 w-2 bg-green-500 inline-block animate-pulse ml-1"></div>
    </div>
  )
}

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMessage("Thank you for subscribing!")
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="py-12 md:py-20 border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/akhil-handa-avatar.jpg" alt="Akhil Handa" width={48} height={48} className="rounded-full" />
              <div>
                <h2 className="text-sm font-medium">Akhil Handa</h2>
                <p className="text-xs text-gray-500">Digital Banking Strategist</p>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">FirstHand</h1>
            <p className="text-xl text-gray-600 mb-8">
              My attempt to chronicle the evolution of digital platforms in banking and adjacent markets.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <a href="#latest-articles">
                    Read Latest
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex h-10 w-full sm:max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
            </div>
          </div>

          {/* Cutting-edge visual element with global focus */}
          <div className="relative h-[475px]">
            {/* Background glow effect */}
            <div className="absolute md:-z-10 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-[350px] h-[350px] bg-blue-400 rounded-full opacity-10 blur-3xl"></div>

            {/* Glassmorphism card with terminal */}
            <div className="w-[90%] max-w-md mx-auto mt-8 md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="backdrop-blur-xl bg-white/30 rounded-2xl border border-white/20 shadow-xl p-6 overflow-hidden">
                <div className="mb-4">
                  <FuturisticTerminal />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-white/50">
                    <div className="text-xs font-medium text-gray-500 mb-1">Global Digital Banking Index</div>
                    <div className="text-lg font-bold text-blue-600">42.8%</div>
                    <div className="flex items-center gap-1 mt-2">
                      <Globe className="h-3 w-3 text-blue-500" />
                      <div className="text-xs text-gray-500">Across 118 countries</div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-white/50">
                    <div className="text-xs font-medium text-gray-500 mb-1">AI Adoption Index</div>
                    <div className="text-lg font-bold text-purple-600">23.7%</div>
                    <div className="flex items-center gap-1 mt-2">
                      <Globe className="h-3 w-3 text-purple-500" />
                      <div className="text-xs text-gray-500">Top 50 financial institutions</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 p-3 rounded-lg mt-4 border border-white/50">
                  <div className="flex items-center justify-between mb-2">
                    {/* <div className="text-xs font-medium text-gray-500">Digital Banking Transformation Live</div> */}
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                      <span className="text-xs text-green-600">AI Banking Transformation Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50/80 p-2 rounded-md flex flex-col items-center">
                      <TrendingUp className="h-5 w-5 text-blue-500 mb-1" />
                      <div className="text-xs font-medium text-center">Real-time Payments</div>
                      <div className="text-sm font-bold text-blue-600">+64%</div>
                    </div>

                    <div className="bg-purple-50/80 p-2 rounded-md flex flex-col items-center">
                      <Lock className="h-5 w-5 text-purple-500 mb-1" />
                      <div className="text-xs font-medium text-center">Open Banking APIs</div>
                      <div className="text-sm font-bold text-purple-600">+37%</div>
                    </div>

                    <div className="bg-green-50/80 p-2 rounded-md flex flex-col items-center">
                      <Zap className="h-5 w-5 text-green-500 mb-1" />
                      <div className="text-xs font-medium text-center">Digital Onboarding</div>
                      <div className="text-sm font-bold text-green-600">+82%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
