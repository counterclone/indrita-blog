import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button skeleton */}
        <Link
          href="/articles"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>

        <header className="mb-8">
          {/* Category and read time skeleton */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <span>•</span>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Title skeleton */}
          <div className="space-y-3 mb-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Author and date skeleton */}
          <div className="flex items-center justify-between text-sm mb-6">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Social share skeleton */}
          <div className="border-t border-b border-gray-100 py-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Hero image skeleton */}
        <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Article content skeleton */}
        <div className="space-y-4">
          {/* Paragraph skeletons */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
          
          {/* Subheading skeleton */}
          <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mt-8 mb-4"></div>
          
          {/* More paragraph skeletons */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading article...</span>
        </div>
      </div>
    </div>
  );
} 