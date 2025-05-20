"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string[];
  readTime: string;
  slug: string;
}

export default function GlobalTrendsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        // Filter articles that have the "Global Trends" category
        const globalArticles = data.filter((article: Article) => 
          Array.isArray(article.category) 
            ? article.category.includes("Global Trends")
            : article.category === "Global Trends"
        );
        setArticles(globalArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Global Trends</h1>
      <p className="text-gray-600 mb-8">
        International perspectives on banking evolution and emerging global financial trends.
      </p>
      
      {articles.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No articles found in this category.</p>
        </div>
      ) : (
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
                  <span>{Array.isArray(article.category) ? article.category.join(", ") : article.category}</span>
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
      )}
    </div>
  );
} 