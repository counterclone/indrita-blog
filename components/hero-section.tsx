"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      toast({
        title: "Success!",
        description: data.message || "Thank you for subscribing!",
        variant: "success"
      });
      setEmail("")
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to subscribe',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-20 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
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
          </div>
        </div>
      </div>
    </section>
  )
}
