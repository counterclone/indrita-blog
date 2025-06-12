export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section Skeleton */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 md:h-10 bg-gray-200 rounded-lg animate-pulse mb-4 w-48"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-96 max-w-full"></div>
          </div>
        </div>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {Array.from({ length: 12 }, (_, i) => (
              <article
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Image skeleton */}
                <div className="relative h-48 sm:h-52 bg-gray-200 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Category and meta skeleton */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-20 bg-blue-100 rounded-full animate-pulse"></div>
                    <div className="h-3 w-1 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Title skeleton */}
                  <div className="space-y-2 mb-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  </div>
                  
                  {/* Excerpt skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                  
                  {/* Author and date skeleton */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="mt-12 flex justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-9 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Page info skeleton */}
          <div className="mt-6 text-center">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-medium">Loading articles...</span>
      </div>
    </div>
  );
}
