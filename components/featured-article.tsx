import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Link href={`/article-content/${slug}`}>
          <Image 
            src={image || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
          />
        </Link>
      </div>
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-blue-600">{categoryDisplay}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        
        <Link href={`/article-content/${slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-6">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">By {author}</span>
          </div>
          <Link href={`/article-content/${slug}`}>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium">
              Read more
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
