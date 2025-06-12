import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import type { Metadata } from 'next';

interface ArticleData {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string | string[];
  readTime: string;
  slug: string;
}

// Enhanced SEO metadata for articles page
export const metadata: Metadata = {
  title: "All Articles | FirstHand by Akhil Handa",
  description: "Browse all articles on digital banking, fintech innovation, and AI in financial services by Akhil Handa, former President & Chief Digital Officer| JPMorgan Chase, Bank of Baroda, Citibank, and more.",
  keywords: [
    "digital banking articles",
    "fintech insights",
    "AI banking articles",
    "Akhil Handa articles",
    "banking innovation blog",
    "financial technology news"
  ].join(", "),
  openGraph: {
    title: "All Articles | FirstHand by Akhil Handa",
    description: "Browse all articles on digital banking, fintech innovation, and AI in financial services.",
    url: "https://firsthand.akhilhanda.com/articles",
    siteName: "FirstHand by Akhil Handa",
    type: "website",
  },
  alternates: {
    canonical: "https://firsthand.akhilhanda.com/articles",
  },
}

// ISR configuration - revalidate every hour
export const revalidate = 3600;

interface ArticlesPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getArticles(page: number = 1, limit: number = 12): Promise<{ articles: ArticleData[], totalPages: number, totalCount: number }> {
  try {
    await connectDB();
    
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalCount = await Article.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    
    // Fetch articles with pagination
    const articles = await Article.find()
      .select('title excerpt image date author category readTime slug _id')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Convert MongoDB documents to plain objects and format dates
    const formattedArticles = articles.map((article: any) => ({
      _id: article._id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      image: article.image,
      date: article.date.toISOString(),
      author: article.author,
      category: article.category,
      slug: article.slug,
      readTime: article.readTime
    }));

    return {
      articles: formattedArticles,
      totalPages,
      totalCount
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      articles: [],
      totalPages: 0,
      totalCount: 0
    };
  }
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 12; // Articles per page
  
  const { articles, totalPages, totalCount } = await getArticles(currentPage, limit);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Articles</h1>
            <p className="text-gray-600 text-lg">
              {totalCount > 0 ? `${totalCount} articles` : 'No articles found'} on digital banking, fintech innovation, and AI in financial services.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {articles.length > 0 ? (
            <>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                {articles.map((article) => (
                  <article
                    key={article._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative h-48 sm:h-52">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
                        <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs">
                          {Array.isArray(article.category) ? article.category.join(", ") : article.category}
                        </span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-3 leading-tight">
                        <Link href={`/article-content/${article.slug}`} className="hover:text-blue-600 transition-colors">
                          {article.title}
                        </Link>
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                        <span className="text-gray-500 font-medium">{article.author}</span>
                        <span className="text-gray-400">
                          {new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <div className="flex items-center gap-2">
                    {currentPage > 1 && (
                      <Link href={`/articles?page=${currentPage - 1}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <ArrowLeft className="w-4 h-4" />
                          Previous
                        </Button>
                      </Link>
                    )}
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Link key={pageNum} href={`/articles?page=${pageNum}`}>
                            <Button
                              variant={pageNum === currentPage ? "default" : "outline"}
                              size="sm"
                              className="w-10 h-10 p-0"
                            >
                              {pageNum}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                    
                    {currentPage < totalPages && (
                      <Link href={`/articles?page=${currentPage + 1}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          Next
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Page Info */}
              <div className="mt-6 text-center text-sm text-gray-500">
                Page {currentPage} of {totalPages} • {totalCount} total articles
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No articles found.</div>
              <div className="mt-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  ← Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}