"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, MessageCircle, Repeat, Heart } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Sample stream of thought data
const thoughtsData = [
  {
    id: 1,
    content:
      "Just had a fascinating conversation with a neobank founder who's pivoting to embedded finance. The shift from consumer-facing to B2B infrastructure is becoming a clear pattern among fintech startups that struggled with CAC.",
    date: "2 hours ago",
    xUrl: "https://x.com/akhilhanda12/status/1234567890",
    likes: 42,
    retweets: 12,
    replies: 5,
  },
  {
    id: 2,
    content:
      "Watching traditional banks struggle with cloud migration while fintechs are already exploring quantum computing feels like observing two different centuries of banking evolution happening simultaneously.",
    date: "Yesterday",
    xUrl: "https://x.com/akhilhanda12/status/1234567891",
    likes: 78,
    retweets: 23,
    replies: 8,
  },
  {
    id: 3,
    content:
      "The most interesting fintech innovations aren't coming from Silicon Valley or London anymore. Spent the morning reviewing case studies from Southeast Asia and Latin America that are leapfrogging Western markets.",
    date: "2 days ago",
    xUrl: "https://x.com/akhilhanda12/status/1234567892",
    likes: 105,
    retweets: 34,
    replies: 12,
  },
  {
    id: 4,
    content:
      "Hot take: Most 'AI in banking' implementations today are just fancy RPA with a marketing upgrade. True AI banking means systems that can reason about financial contexts and make autonomous decisions.",
    date: "3 days ago",
    xUrl: "https://x.com/akhilhanda12/status/1234567893",
    likes: 156,
    retweets: 48,
    replies: 22,
  },
  {
    id: 5,
    content:
      "Regulation will never keep pace with innovation in fintech. We need adaptive regulatory frameworks that can evolve with technology rather than constantly playing catch-up.",
    date: "5 days ago",
    xUrl: "https://x.com/akhilhanda12/status/1234567894",
    likes: 92,
    retweets: 27,
    replies: 14,
  },
]

// Wave animation component
const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <svg
        className="absolute bottom-0 left-0 w-full h-48 transform translate-y-1/4"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(59, 130, 246, 0.04)" className="animate-wave-slow" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(59, 130, 246, 0.05)" className="animate-wave-middle" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(59, 130, 246, 0.06)" className="animate-wave-fast" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(59, 130, 246, 0.07)" className="animate-wave-slow" />
        </g>
      </svg>
    </div>
  )
}

export function StreamOfThought() {
  const [visibleCount, setVisibleCount] = useState(3)
  const [activeThought, setActiveThought] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const showMore = () => {
    setVisibleCount(Math.min(visibleCount + 3, thoughtsData.length))
  }

  return (
    <div className="relative space-y-4 py-8">
      {/* Animated wave background */}
      <WaveBackground />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6 bg-blue-50/80 backdrop-blur-sm p-3 rounded-lg border border-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-black"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <Link
            href="https://x.com/akhilhanda12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            @akhilhanda12
          </Link>
          <span className="text-sm text-gray-500 ml-auto">President & CDO</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {thoughtsData.slice(0, visibleCount).map((thought, index) => (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveThought(thought.id)}
                  onMouseLeave={() => setActiveThought(null)}
                >
                  <Card
                    className={`p-4 bg-white/90 backdrop-blur-sm border-gray-200 hover:border-blue-300 transition-all duration-300 ${
                      activeThought === thought.id ? "shadow-md transform -translate-y-1" : "shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-black"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-800">@akhilhanda12</span>
                      <span className="text-xs text-gray-500 ml-auto">{thought.date}</span>
                    </div>
                    <p className="text-gray-800 mb-4">{thought.content}</p>
                    <div className="flex justify-between items-center text-gray-500 text-xs">
                      <Link
                        href={thought.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                      >
                        View on X
                      </Link>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>{thought.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Repeat className="h-3.5 w-3.5" />
                          <span>{thought.retweets}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5" />
                          <span>{thought.likes}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        <div className="flex justify-between items-center mt-6">
          {visibleCount < thoughtsData.length && (
            <motion.button
              onClick={showMore}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show more thoughts
            </motion.button>
          )}
          <Link href="/thoughts" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            View all thoughts
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
