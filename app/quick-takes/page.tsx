"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  Twitter,
  MoreHorizontal,
  TrendingUp,
  Zap,
  BarChart3,
  ImageIcon,
  Quote,
  Type,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { formatDistanceToNow } from 'date-fns'

interface QuickTake {
  _id: string;
  type: 'text' | 'chart' | 'image' | 'quote';
  content: string;
  chartData?: {
    title: string;
    description: string;
    embedHtml: string;
  };
  image?: string;
  author?: string;
  tags: string[];
  likes: number;
  comments: number;
  trending: boolean;
  createdAt: string;
  isPublished: boolean;
}

function ShareButtons({ take }: { take: QuickTake }) {
  const shareUrl = `https://www.akhilhanda.com/quick-takes/${take._id}`
  
  // Create smart share messages based on content type
  const getShareMessage = (platform: 'twitter' | 'whatsapp') => {
    let baseMessage = ""
    let contentDescription = ""
    
    switch (take.type) {
      case "text":
        contentDescription = `"${take.content.slice(0, 120)}${take.content.length > 120 ? '...' : ''}"`
        break
      case "quote":
        contentDescription = `💭 "${take.content}" - ${take.author}`
        break
      case "image":
        contentDescription = `📸 ${take.content} [Image included in post]`
        break
      case "chart":
        contentDescription = `📊 ${take.content} - Chart: ${take.chartData?.title}`
        break
    }

    if (platform === 'twitter') {
      baseMessage = `${contentDescription}\n\nQuick take from @akhilhanda12`
    } else {
      baseMessage = `${contentDescription}\n\nRead the full quick take by Akhil Handa on digital banking:`
    }

    return baseMessage
  }

  return (
    <div className="flex items-center gap-1">
      {/* Twitter Share */}
      <button
        onClick={() => {
          const message = getShareMessage('twitter')
          const tweetText = `${message}\n\n${shareUrl}`
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
            "_blank",
          )
        }}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-50 text-slate-600 transition-all duration-200 hover:scale-105"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      {/* WhatsApp Share */}
      <button
        onClick={() => {
          const message = getShareMessage('whatsapp')
          const whatsappText = `${message}\n\n${shareUrl}`
          window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, "_blank")
        }}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-50 text-green-600 transition-all duration-200 hover:scale-105"
        title="Share on WhatsApp"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" />
        </svg>
      </button>

      {/* More Share Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-50 text-slate-500 transition-all duration-200 hover:scale-105">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const message = getShareMessage('twitter')
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                "_blank",
              )
            }}
          >
            Share on LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const message = getShareMessage('whatsapp')
              window.open(
                `mailto:?subject=${encodeURIComponent('Digital Banking Insights from Akhil Handa')}&body=${encodeURIComponent(`${message}\n\n${shareUrl}`)}`,
                "_blank",
              )
            }}
          >
            Share via Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function ContentTypeIcon({ type }: { type: string }) {
  const iconClass = "w-4 h-4"

  switch (type) {
    case "text":
      return <Type className={iconClass} />
    case "quote":
      return <Quote className={iconClass} />
    case "image":
      return <ImageIcon className={iconClass} />
    case "chart":
      return <BarChart3 className={iconClass} />
    default:
      return <Type className={iconClass} />
  }
}

function QuickTakeCard({ take, index }: { take: QuickTake; index: number }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(take.likes)

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/quick-takes/${take._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isLiked ? 'unlike' : 'like',
        }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
      <Card className="group bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden relative">
        {/* Gradient border effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ padding: "1px" }}
        >
          <div className="bg-white rounded-2xl h-full w-full"></div>
        </div>

        <div className="relative">
          {/* Header with type indicator and trending badge */}
          <div className="flex items-center justify-between p-6 pb-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-sm text-slate-600">
                <ContentTypeIcon type={take.type} />
                <span className="capitalize font-medium">{take.type}</span>
              </div>
            </div>

            {take.trending && (
              <Badge className="bg-blue-600 text-white border-0 rounded-full px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>

          <CardContent className="p-6 pt-4">
            {/* Content */}
            <div className="mb-6">
              {take.type === "image" && (
                <div className="space-y-4">
                  <p className="text-slate-900 leading-relaxed text-[15px]">{take.content}</p>
                  {take.image && (
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src={take.image}
                        alt={take.content}
                        width={500}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              )}

              {take.type === "chart" && take.chartData && (
                <div className="space-y-4">
                  <p className="text-slate-900 leading-relaxed text-[15px]">{take.content}</p>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-slate-900">{take.chartData.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{take.chartData.description}</p>
                    <div 
                      className="w-full aspect-video rounded-lg overflow-hidden bg-slate-50"
                      dangerouslySetInnerHTML={{ __html: take.chartData.embedHtml }}
                    />
                  </div>
                </div>
              )}

              {take.type === "quote" && (
                <div className="relative">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
                    <div className="text-3xl text-blue-600 font-serif mb-2">"</div>
                    <blockquote className="text-slate-900 leading-relaxed text-lg font-medium mb-4">
                      {take.content}
                    </blockquote>
                    {take.author && (
                      <cite className="text-slate-600 text-sm font-medium not-italic">
                        — {take.author}
                      </cite>
                    )}
                  </div>
                </div>
              )}

              {take.type === "text" && (
                <p className="text-slate-900 leading-relaxed text-[15px] font-normal">
                  {take.content}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {take.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 rounded-full px-3 py-1 font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Footer with metadata and actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Dec 20, 2024</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatDistanceToNow(new Date(take.createdAt))} ago</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition-colors text-sm ${
                    isLiked ? "text-red-500" : "text-slate-500 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 transition-all duration-200 ${isLiked ? "fill-current" : ""}`} />
                  <span className="font-medium">{likeCount}</span>
                </button>
                <ShareButtons take={take} />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default function QuickTakesPage() {
  const [quickTakes, setQuickTakes] = useState<QuickTake[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const ITEMS_PER_PAGE = 4

  useEffect(() => {
    const fetchQuickTakes = async () => {
      try {
        const response = await fetch('/api/quick-takes')
        if (!response.ok) {
          throw new Error('Failed to fetch quick takes')
        }
        const data = await response.json()
        setQuickTakes(data)
        setHasMore(data.length > ITEMS_PER_PAGE)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuickTakes()
  }, [])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
    if (quickTakes.length <= page * ITEMS_PER_PAGE) {
      setHasMore(false)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
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

      setMessage(data.message || "Thank you for subscribing!");
      setEmail("")
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-200 h-48 rounded-2xl"></div>
          ))}
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-8 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
        Back to Home
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Quick Takes
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Real-time Digital Platforms Insights
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Rapid-fire observations, data points, and insights from the frontlines of digital banking transformation.
          <br />
          <span className="text-blue-600 font-medium">Fresh takes as they happen.</span>
        </p>
      </div>

      <div className="space-y-8">
        {quickTakes.slice(0, page * ITEMS_PER_PAGE).map((take, index) => (
          <QuickTakeCard key={take._id} take={take} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-12">
          <Button
            onClick={handleLoadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 font-medium"
          >
            Load More Takes
          </Button>
        </div>
      )}

      <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Never Miss a Take</h3>
          <p className="text-slate-600 mb-8 text-lg">
            Get the latest insights delivered straight to your inbox
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          {message && <p className={`text-sm mt-2 ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        </div>
      </div>
    </main>
  )
}
