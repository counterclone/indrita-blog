"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Linkedin } from "lucide-react"
import Link from "next/link"

// Sample LinkedIn articles data
// In a real implementation, this would be fetched from LinkedIn API
const linkedinArticles = [
  {
    id: 1,
    title: "The Future of Digital Banking in India",
    excerpt:
      "Exploring how digital transformation is reshaping the banking landscape in India and what it means for consumers and businesses.",
    likes: 245,
    comments: 32,
    date: "2 weeks ago",
    url: "https://www.linkedin.com/pulse/future-digital-banking-india-akhil-handa",
  },
  {
    id: 2,
    title: "AI's Impact on Financial Decision Making",
    excerpt:
      "How artificial intelligence is changing the way financial institutions make decisions and what it means for risk management.",
    likes: 189,
    comments: 24,
    date: "1 month ago",
    url: "https://www.linkedin.com/pulse/ais-impact-financial-decision-making-akhil-handa",
  },
  {
    id: 3,
    title: "The Rise of Embedded Finance",
    excerpt:
      "Why non-financial companies are increasingly offering financial services and how this trend is disrupting traditional banking models.",
    likes: 312,
    comments: 47,
    date: "2 months ago",
    url: "https://www.linkedin.com/pulse/rise-embedded-finance-akhil-handa",
  },
]

export function LinkedInArticles() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Linkedin className="h-5 w-5 text-blue-700" />
        <Link
          href="https://linkedin.com/in/akhilh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline font-medium"
        >
          Akhil Handa on LinkedIn
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <>
          {linkedinArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardContent className="p-6">
                <Link href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-700">{article.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex gap-4">
                    <span>{article.likes} likes</span>
                    <span>{article.comments} comments</span>
                  </div>
                  <span>{article.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Link
              href="https://linkedin.com/in/akhilh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-sm font-medium flex items-center"
            >
              View all LinkedIn articles
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
