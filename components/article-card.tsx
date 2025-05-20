import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string | string[]
  slug: string
  _id: string
}

export function ArticleCard({ title, excerpt, image, date, author, category, slug, _id }: ArticleCardProps) {
  // Format category for display
  const categoryDisplay = Array.isArray(category) 
    ? category.join(", ") 
    : category;
    
  return (
    <Link href={`/article-content/${slug}`} className="group">
      <div className="overflow-hidden rounded-lg mb-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-blue-600">{categoryDisplay}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
        <div className="text-xs text-gray-500">By {author}</div>
      </div>
    </Link>
  )
}
