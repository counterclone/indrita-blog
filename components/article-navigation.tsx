"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AdjacentArticle {
  title: string;
  slug: string;
  _id: string;
}

interface ArticleNavigationProps {
  currentArticleDate: string;
}

interface AdjacentArticles {
  previousArticle: AdjacentArticle | null;
  nextArticle: AdjacentArticle | null;
}

export default function ArticleNavigation({ currentArticleDate }: ArticleNavigationProps) {
  const [articles, setArticles] = useState<AdjacentArticles>({
    previousArticle: null,
    nextArticle: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdjacentArticles = async () => {
      try {
        const response = await fetch(`/api/articles/adjacent?date=${encodeURIComponent(currentArticleDate)}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error('Error fetching adjacent articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdjacentArticles();
  }, [currentArticleDate]);

  if (loading) {
    return (
      <div className="border-t border-gray-100 pt-8 mt-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Previous article skeleton */}
          <div className="animate-pulse">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
          {/* Next article skeleton */}
          <div className="animate-pulse">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no adjacent articles
  if (!articles.previousArticle && !articles.nextArticle) {
    return null;
  }

  return (
    <nav className="border-t border-gray-100 pt-8 mt-12" aria-label="Article navigation">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Previous Article */}
        <div className="flex justify-start">
          {articles.previousArticle ? (
            <Link 
              href={`/article-content/${articles.previousArticle.slug}`}
              className="group flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 w-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-500 group-hover:text-blue-600 font-medium mb-1">
                  Previous Article
                </p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 line-clamp-2 leading-snug">
                  {articles.previousArticle.title}
                </h3>
              </div>
            </Link>
          ) : (
            <div className="p-4 w-full">
              <p className="text-sm text-gray-400">No previous article</p>
            </div>
          )}
        </div>

        {/* Next Article */}
        <div className="flex justify-end">
          {articles.nextArticle ? (
            <Link 
              href={`/article-content/${articles.nextArticle.slug}`}
              className="group flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 w-full text-right"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-500 group-hover:text-blue-600 font-medium mb-1">
                  Next Article
                </p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 line-clamp-2 leading-snug">
                  {articles.nextArticle.title}
                </h3>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0" />
            </Link>
          ) : (
            <div className="p-4 w-full text-right">
              <p className="text-sm text-gray-400">No next article</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 