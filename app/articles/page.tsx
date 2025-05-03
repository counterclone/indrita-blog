import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import { Document } from 'mongoose';

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  slug: string;
}

export const revalidate = 0; // Disable caching

async function getArticles(): Promise<Article[]> {
  try {
    await connectDB();
    const articles = await Article.find().sort({ date: -1 }).lean();
    return articles as unknown as Article[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Articles</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article._id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/article-content/${article.slug}`} className="hover:text-blue-600">
                    {article.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{article.author}</span>
                  <span className="text-gray-500">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}