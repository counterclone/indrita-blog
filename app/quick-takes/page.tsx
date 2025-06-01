"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Twitter,
  MessageSquare,
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

// Mock data for quick takes with different content types
const quickTakes = [
  {
    id: 1,
    type: "text",
    content:
      "The shift towards embedded finance is accelerating faster than most traditional banks anticipated. We're seeing fintech companies becoming the new infrastructure layer.",
    timestamp: "2 hours ago",
    date: "Dec 1, 2024",
    tags: ["fintech", "embedded-finance"],
    likes: 12,
    comments: 3,
    trending: true,
  },
  {
    id: 2,
    type: "chart",
    content: "Digital banking adoption rates across different demographics. The 45+ age group is finally catching up!",
    chartData: {
      title: "Digital Banking Adoption by Age Group",
      description: "Q3 2024 vs Q3 2023",
    },
    timestamp: "4 hours ago",
    date: "Dec 1, 2024",
    tags: ["data", "adoption", "demographics"],
    likes: 28,
    comments: 7,
  },
  {
    id: 3,
    type: "image",
    content:
      "Spotted this brilliant UX pattern at a Singapore bank. The way they've simplified multi-currency transfers is *chef's kiss*",
    image: "/placeholder.svg?height=300&width=500&text=Bank+UX+Screenshot",
    timestamp: "6 hours ago",
    date: "Dec 1, 2024",
    tags: ["ux", "singapore", "transfers"],
    likes: 15,
    comments: 5,
  },
  {
    id: 4,
    type: "text",
    content:
      "Real-time payments adoption is creating a domino effect across the entire financial ecosystem. The implications for cash flow management and working capital are profound.",
    timestamp: "1 day ago",
    date: "Nov 30, 2024",
    tags: ["real-time-payments", "cash-flow"],
    likes: 22,
    comments: 8,
    trending: true,
  },
  {
    id: 5,
    type: "quote",
    content: "The best digital banking experiences don't feel like banking at all.",
    author: "Overheard at FinTech Week",
    timestamp: "2 days ago",
    date: "Nov 29, 2024",
    tags: ["ux", "philosophy"],
    likes: 45,
    comments: 12,
  },
]

function ShareButtons({ takeId }: { takeId: number }) {
  const shareUrl = `https://akhilhanda.com/quick-takes/${takeId}`
  const shareText = "Check out this quick take from Akhil Handa"

  return (
    <div className="flex items-center gap-1">
      {/* Twitter Share */}
      <button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            "_blank",
          )
        }
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-50 text-blue-600 transition-all duration-200 hover:scale-105"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      {/* WhatsApp Share */}
      <button
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank")}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-50 text-green-600 transition-all duration-200 hover:scale-105"
        title="Share on WhatsApp"
      >
        <MessageSquare className="w-4 h-4" />
      </button>

      {/* More Share Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-50 text-gray-500 transition-all duration-200 hover:scale-105">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                "_blank",
              )
            }
          >
            Share on LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              window.open(
                `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`,
                "_blank",
              )
            }
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

function QuickTakeCard({ take }: { take: (typeof quickTakes)[0] }) {
  return (
    <Card className="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden relative">
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ padding: "1px" }}
      >
        <div className="bg-white rounded-2xl h-full w-full"></div>
      </div>

      <div className="relative">
        {/* Header with type indicator and trending badge */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-600">
              <ContentTypeIcon type={take.type} />
              <span className="capitalize font-medium">{take.type}</span>
            </div>
          </div>

          {take.trending && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 rounded-full px-3 py-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        <CardContent className="p-6 pt-4">
          {/* Content based on type */}
          <div className="mb-6">
            {take.type === "text" && (
              <p className="text-gray-900 leading-relaxed text-[15px] font-normal">{take.content}</p>
            )}

            {take.type === "quote" && (
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="text-3xl text-blue-500 font-serif mb-2">"</div>
                  <blockquote className="text-gray-900 leading-relaxed text-lg font-medium mb-4">
                    {take.content}
                  </blockquote>
                  {take.author && <cite className="text-gray-600 text-sm font-medium not-italic">— {take.author}</cite>}
                </div>
              </div>
            )}

            {take.type === "image" && (
              <div className="space-y-4">
                <p className="text-gray-900 leading-relaxed text-[15px]">{take.content}</p>
                <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <Image
                    src={take.image! || "/placeholder.svg"}
                    alt="Quick take image"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            {take.type === "chart" && (
              <div className="space-y-4">
                <p className="text-gray-900 leading-relaxed text-[15px]">{take.content}</p>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">{take.chartData?.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{take.chartData?.description}</p>
                  <div className="h-40 bg-white rounded-lg border border-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-500 text-sm">Interactive Chart</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {take.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {take.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 rounded-full px-3 py-1 font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{take.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{take.timestamp}</span>
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors text-gray-500 text-sm">
                <Heart className="w-4 h-4" />
                <span className="font-medium">{take.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors text-gray-500 text-sm">
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">{take.comments}</span>
              </button>
              <ShareButtons takeId={take.id} />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default function QuickTakesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 rounded-full px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <span className="text-sm text-gray-500 font-medium">FirstHand</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Quick Takes
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
            Real-time Digital Banking Insights
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Rapid-fire observations, data points, and insights from the frontlines of digital banking transformation.
            <br />
            <span className="text-blue-600 font-medium">Fresh takes as they happen.</span>
          </p>
        </div>

        {/* Quick Takes Feed */}
        <div className="space-y-8">
          {quickTakes.map((take, index) => (
            <div
              key={take.id}
              className="animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <QuickTakeCard take={take} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
            Load More Takes
          </Button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          <div className="relative text-center">
            <h3 className="text-2xl font-bold mb-3">Never Miss a Take</h3>
            <p className="text-blue-100 mb-8 text-lg">Get the latest insights delivered straight to your inbox</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 border-0"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 mt-20">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">© 2024 FirstHand</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About Me
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
