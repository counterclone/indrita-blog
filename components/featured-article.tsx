"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackFeaturedArticleClick } from "@/lib/analytics"

interface FeaturedArticleProps {
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string | string[]
  slug: string
  _id: string
}

export function FeaturedArticle({ title, excerpt, image, date, author, category, slug, _id }: FeaturedArticleProps) {
  // Format category for display
  const categoryDisplay = Array.isArray(category) 
    ? category.join(", ") 
    : category;
    
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="relative group">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Link href={`/article-content/${slug}`}>
            <Image 
              src={image || "/placeholder.svg"} 
              alt={title} 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
            />
          </Link>
          {/* Subtle featured badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-xs font-medium shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            <span>Featured</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Tags consistent with other articles */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-xs font-medium text-blue-600">{categoryDisplay}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        
        <Link href={`/article-content/${slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer leading-tight" onClick={() => trackFeaturedArticleClick(_id, title)}>
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-600 leading-relaxed">{excerpt}</p>
        
        <div className="flex items-center justify-between pt-2">
          {/* Simple author without icon */}
          <span className="text-sm text-gray-500">By {author}</span>
          
          <Link href={`/article-content/${slug}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200" onClick={() => trackFeaturedArticleClick(_id, title)}>
              Read Insight
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
