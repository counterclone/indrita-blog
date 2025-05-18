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

  const handleSubmit = async (e) => {
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
          <div className="relative hidden md:block h-[400px]">
            {/* Background glow effect */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-400 rounded-full opacity-10 blur-3xl"></div>

            {/* World map background */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 1000 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M473.4,144.9c-3.4,0.6-6.6,1.3-9.8,1.9c-0.5,0.1-1,0.2-1.5,0.3c-0.7-2.5-1.4-5-2.1-7.5c0.7-0.3,1.4-0.7,2.1-1
                  c3.8-1.8,7.6-3.6,11.3-5.4c0.3,3.9,0.7,7.8,1,11.7C474,144.9,473.7,144.9,473.4,144.9z M604.7,74.9c-3.2,1.1-6.4,2.3-9.6,3.4
                  c-0.5,0.2-1,0.4-1.5,0.5c-0.5-2.5-1-5-1.5-7.5c0.7-0.4,1.5-0.8,2.2-1.2c3.6-2,7.2-4,10.8-6c0.1,3.9,0.2,7.8,0.3,11.7
                  C605.2,75.6,605,75.3,604.7,74.9z M299.9,156.9c-3.4-0.5-6.8-1-10.2-1.5c-0.5-0.1-1-0.1-1.5-0.2c0.3-2.5,0.6-5,0.9-7.5
                  c0.8-0.1,1.5-0.2,2.3-0.3c4.1-0.5,8.2-1,12.3-1.5c-0.7,3.8-1.4,7.6-2.1,11.4C301,157.1,300.5,157,299.9,156.9z M159.9,222.9
                  c-2.9-1.8-5.8-3.6-8.7-5.4c-0.4-0.3-0.9-0.5-1.3-0.8c1.2-2.2,2.4-4.4,3.6-6.6c0.7,0.3,1.4,0.6,2.1,0.9c3.8,1.7,7.6,3.4,11.4,5.1
                  c-1.9,3.4-3.8,6.8-5.7,10.2C160.8,225.1,160.4,224,159.9,222.9z M99.9,312.9c-1.6-3-3.2-6-4.8-9c-0.2-0.4-0.5-0.9-0.7-1.3
                  c2-1.6,4-3.2,6-4.8c0.5,0.5,1,1.1,1.5,1.6c2.9,3,5.8,6,8.7,9c-2.9,2.6-5.8,5.2-8.7,7.8C101.1,315,100.5,313.9,99.9,312.9z
                  M119.9,402.9c0.1-3.4,0.2-6.8,0.3-10.2c0-0.5,0.1-1,0.1-1.5c2.5-0.3,5-0.6,7.5-0.9c0.1,0.8,0.2,1.5,0.3,2.3
                  c0.5,4.1,1,8.2,1.5,12.3c-3.8-0.7-7.6-1.4-11.4-2.1C118.7,402.9,119.3,402.9,119.9,402.9z M209.9,462.9c1.8-2.9,3.6-5.8,5.4-8.7
                  c0.3-0.4,0.5-0.9,0.8-1.3c2.2,1.2,4.4,2.4,6.6,3.6c-0.3,0.7-0.6,1.4-0.9,2.1c-1.7,3.8-3.4,7.6-5.1,11.4c-3.4-1.9-6.8-3.8-10.2-5.7
                  C207.7,463.8,208.8,463.4,209.9,462.9z M319.9,482.9c3-1.6,6-3.2,9-4.8c0.4-0.2,0.9-0.5,1.3-0.7c1.6,2,3.2,4,4.8,6
                  c-0.5,0.5-1.1,1-1.6,1.5c-3,2.9-6,5.8-9,8.7c-2.6-2.9-5.2-5.8-7.8-8.7C317.8,484.1,318.9,483.5,319.9,482.9z M429.9,442.9
                  c3.4,0.1,6.8,0.2,10.2,0.3c0.5,0,1,0.1,1.5,0.1c0.3,2.5,0.6,5,0.9,7.5c-0.8,0.1-1.5,0.2-2.3,0.3c-4.1,0.5-8.2,1-12.3,1.5
                  c0.7-3.8,1.4-7.6,2.1-11.4C429.9,441.7,429.9,442.3,429.9,442.9z M519.9,362.9c2.9,1.8,5.8,3.6,8.7,5.4c0.4,0.3,0.9,0.5,1.3,0.8
                  c-1.2,2.2-2.4,4.4-3.6,6.6c-0.7-0.3-1.4-0.6-2.1-0.9c-3.8-1.7-7.6-3.4-11.4-5.1c1.9-3.4,3.8-6.8,5.7-10.2
                  C519,360.7,519.4,361.8,519.9,362.9z M559.9,272.9c1.6,3,3.2,6,4.8,9c0.2,0.4,0.5,0.9,0.7,1.3c-2,1.6-4,3.2-6,4.8
                  c-0.5-0.5-1-1.1-1.5-1.6c-2.9-3-5.8-6-8.7-9c2.9-2.6,5.8-5.2,8.7-7.8C558.7,270.8,559.3,271.9,559.9,272.9z M539.9,182.9
                  c-0.1,3.4-0.2,6.8-0.3,10.2c0,0.5-0.1,1-0.1,1.5c-2.5,0.3-5,0.6-7.5,0.9c-0.1-0.8-0.2-1.5-0.3-2.3c-0.5-4.1-1-8.2-1.5-12.3
                  c3.8,0.7,7.6,1.4,11.4,2.1C541.1,182.9,540.5,182.9,539.9,182.9z M449.9,122.9c-1.8,2.9-3.6,5.8-5.4,8.7c-0.3,0.4-0.5,0.9-0.8,1.3
                  c-2.2-1.2-4.4-2.4-6.6-3.6c0.3-0.7,0.6-1.4,0.9-2.1c1.7-3.8,3.4-7.6,5.1-11.4c3.4,1.9,6.8,3.8,10.2,5.7
                  C452.1,122,451,122.4,449.9,122.9z M339.9,102.9c-3,1.6-6,3.2-9,4.8c-0.4,0.2-0.9,0.5-1.3,0.7c-1.6-2-3.2-4-4.8-6
                  c0.5-0.5,1.1-1,1.6-1.5c3-2.9,6-5.8,9-8.7c2.6,2.9,5.2,5.8,7.8,8.7C342,101.7,340.9,102.3,339.9,102.9z M229.9,142.9
                  c-3.4-0.1-6.8-0.2-10.2-0.3c-0.5,0-1-0.1-1.5-0.1c-0.3-2.5-0.6-5-0.9-7.5c0.8-0.1,1.5-0.2,2.3-0.3c4.1-0.5,8.2-1,12.3-1.5
                  c-0.7,3.8-1.4,7.6-2.1,11.4C229.9,144.1,229.9,143.5,229.9,142.9z M139.9,222.9c-2.9-1.8-5.8-3.6-8.7-5.4c-0.4-0.3-0.9-0.5-1.3-0.8
                  c1.2-2.2,2.4-4.4,3.6-6.6c0.7,0.3,1.4,0.6,2.1,0.9c3.8,1.7,7.6,3.4,11.4,5.1c-1.9,3.4-3.8,6.8-5.7,10.2
                  C140.8,225.1,140.4,224,139.9,222.9z M99.9,312.9c-1.6-3-3.2-6-4.8-9c-0.2-0.4-0.5-0.9-0.7-1.3c2-1.6,4-3.2,6-4.8
                  c0.5,0.5,1,1.1,1.5,1.6c2.9,3,5.8,6,8.7,9c-2.9,2.6-5.8,5.2-8.7,7.8C101.1,315,100.5,313.9,99.9,312.9z M119.9,402.9
                  c0.1-3.4,0.2-6.8,0.3-10.2c0-0.5,0.1-1,0.1-1.5c2.5-0.3,5-0.6,7.5-0.9c0.1,0.8,0.2,1.5,0.3,2.3c0.5,4.1,1,8.2,1.5,12.3
                  c-3.8-0.7-7.6-1.4-11.4-2.1C118.7,402.9,119.3,402.9,119.9,402.9z M209.9,462.9c1.8-2.9,3.6-5.8,5.4-8.7c0.3-0.4,0.5-0.9,0.8-1.3
                  c2.2,1.2,4.4,2.4,6.6,3.6c-0.3,0.7-0.6,1.4-0.9,2.1c-1.7,3.8-3.4,7.6-5.1,11.4c-3.4-1.9-6.8-3.8-10.2-5.7
                  C207.7,463.8,208.8,463.4,209.9,462.9z M319.9,482.9c3-1.6,6-3.2,9-4.8c0.4-0.2,0.9-0.5,1.3-0.7c1.6,2,3.2,4,4.8,6
                  c-0.5,0.5-1.1,1-1.6,1.5c-3,2.9-6,5.8-9,8.7c-2.6-2.9-5.2-5.8-7.8-8.7C317.8,484.1,318.9,483.5,319.9,482.9z M429.9,442.9
                  c3.4,0.1,6.8,0.2,10.2,0.3c0.5,0,1,0.1,1.5,0.1c0.3,2.5,0.6,5,0.9,7.5c-0.8,0.1-1.5,0.2-2.3,0.3c-4.1,0.5-8.2,1-12.3,1.5
                  c0.7-3.8,1.4-7.6,2.1-11.4C429.9,441.7,429.9,442.3,429.9,442.9z M519.9,362.9c2.9,1.8,5.8,3.6,8.7,5.4c0.4,0.3,0.9,0.5,1.3,0.8
                  c-1.2,2.2-2.4,4.4-3.6,6.6c-0.7-0.3-1.4-0.6-2.1-0.9c-3.8-1.7-7.6-3.4-11.4-5.1c1.9-3.4,3.8-6.8,5.7-10.2
                  C519,360.7,519.4,361.8,519.9,362.9z M559.9,272.9c1.6,3,3.2,6,4.8,9c0.2,0.4,0.5,0.9,0.7,1.3c-2,1.6-4,3.2-6,4.8
                  c-0.5-0.5-1-1.1-1.5-1.6c-2.9-3-5.8-6-8.7-9c2.9-2.6,5.8-5.2,8.7-7.8C558.7,270.8,559.3,271.9,559.9,272.9z M539.9,182.9
                  c-0.1,3.4-0.2,6.8-0.3,10.2c0,0.5-0.1,1-0.1,1.5c-2.5,0.3-5,0.6-7.5,0.9c-0.1-0.8-0.2-1.5-0.3-2.3c-0.5-4.1-1-8.2-1.5-12.3
                  c3.8,0.7,7.6,1.4,11.4,2.1C541.1,182.9,540.5,182.9,539.9,182.9z M449.9,122.9c-1.8,2.9-3.6,5.8-5.4,8.7c-0.3,0.4-0.5,0.9-0.8,1.3
                  c-2.2-1.2-4.4-2.4-6.6-3.6c0.3-0.7,0.6-1.4,0.9-2.1c1.7-3.8,3.4-7.6,5.1-11.4c3.4,1.9,6.8,3.8,10.2,5.7
                  C452.1,122,451,122.4,449.9,122.9z M339.9,102.9c-3,1.6-6,3.2-9,4.8c-0.4,0.2-0.9,0.5-1.3,0.7c-1.6-2-3.2-4-4.8-6
                  c0.5-0.5,1.1-1,1.6-1.5c3-2.9,6-5.8,9-8.7c2.6,2.9,5.2,5.8,7.8,8.7C342,101.7,340.9,102.3,339.9,102.9z"
                  fill="#3B82F6"
                />
              </svg>
            </div>

            {/* Glassmorphism card with terminal */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
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
                    <div className="text-xs font-medium text-gray-500">Digital Banking Transformation</div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                      <span className="text-xs text-green-600">Live</span>
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
