import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://firsthand.akhilhanda.com'
  
  try {
    await connectDB()
    
    // Get all articles
    const articles = await Article.find()
      .select('slug updatedAt')
      .lean()

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/articles`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/thoughts`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
    ]

    // Topic pages
    const topicPages = [
      'ai-banking',
      'digital-transformation', 
      'fintech-innovation',
      'global-trends'
    ].map(topic => ({
      url: `${baseUrl}/topics/${topic}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Article pages
    const articlePages = articles.map((article: any) => ({
      url: `${baseUrl}/article-content/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...topicPages, ...articlePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if DB connection fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
    ]
  }
} 