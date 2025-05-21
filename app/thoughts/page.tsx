"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTweets } from "@/hooks/useTweets";
import Script from "next/script";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function ThoughtsPage() {
  const { tweets, loading, loadingMore, error, hasMore, loadMore } = useTweets();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const tweetsContainerRef = useRef<HTMLDivElement>(null);

  // Callback for intersection observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loadingMore) {
      loadMore();
    }
  }, [hasMore, loadMore, loadingMore]);

  // Set up intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);
    
    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Effect to handle tweet rendering
  useEffect(() => {
    if (window.twttr && tweetsContainerRef.current) {
      window.twttr.widgets.load(tweetsContainerRef.current);
    }
  }, [tweets]);

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
    <>
      <Script 
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold mb-8">Thoughts</h1>

          <div ref={tweetsContainerRef} className="grid gap-8 md:grid-cols-2 tweet-container">
            {tweets.map((thought) => (
              <div
                key={thought._id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: thought.embedHtml }}
                />
                <div className="mt-4 text-sm text-gray-500">
                  {formatDate(thought.date)}
                </div>
              </div>
            ))}
          </div>

          {/* Loading indicator and observer target */}
          <div ref={loadingRef} className="py-8 flex justify-center">
            {loadingMore && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}