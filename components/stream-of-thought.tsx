"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Thought {
  _id: string;
  embedHtml: string;
  date: string;
}

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
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [visibleCount, setVisibleCount] = useState(3)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch('/api/thoughts')
        if (!response.ok) {
          throw new Error('Failed to fetch thoughts')
        }
        const data = await response.json()
        setThoughts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchThoughts()
  }, [])

  // Load Twitter widgets after component mounts
  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load()
    }
  }, [thoughts, visibleCount])

  const showMore = () => {
    setVisibleCount(Math.min(visibleCount + 3, thoughts.length))
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
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
          <a
            href="https://x.com/akhilhanda12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            @akhilhanda12
          </a>
          <span className="text-sm text-gray-500 ml-auto">President & CDO</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {thoughts.slice(0, visibleCount).map((thought, index) => (
                <motion.div
                  key={thought._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="min-h-[200px] flex items-start"
                >
                  <div 
                    dangerouslySetInnerHTML={{ __html: thought.embedHtml }} 
                    className="w-full"
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {!isLoading && visibleCount < thoughts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={showMore}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Show more thoughts
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
