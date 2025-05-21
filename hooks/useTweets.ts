import { useState, useEffect, useCallback } from 'react';

// Add Twitter widget type declarations
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => Promise<void>;
        createTweet: (tweetId: string, element: HTMLElement, options?: any) => Promise<void>;
      };
    };
  }
}

interface Thought {
  _id: string;
  embedHtml: string;
  date: string;
}

const BATCH_SIZE = 3;
const TWEET_CACHE_KEY = 'cached_tweets';

export function useTweets() {
  const [allTweets, setAllTweets] = useState<Thought[]>([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load cached tweets from localStorage
  useEffect(() => {
    const cachedTweets = localStorage.getItem(TWEET_CACHE_KEY);
    if (cachedTweets) {
      const parsed = JSON.parse(cachedTweets);
      setAllTweets(parsed);
      setHasMore(parsed.length > visibleCount);
      setLoading(false);
    }
  }, []);

  // Fetch tweets from API
  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch('/api/thoughts', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        // Compare with cached data and update only if different
        const cachedData = localStorage.getItem(TWEET_CACHE_KEY);
        const parsedCachedData = cachedData ? JSON.parse(cachedData) : [];
        
        if (JSON.stringify(data) !== JSON.stringify(parsedCachedData)) {
          setAllTweets(data);
          localStorage.setItem(TWEET_CACHE_KEY, JSON.stringify(data));
        }

        setHasMore(data.length > visibleCount);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
        setError('Failed to load thoughts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, []);

  // Load more tweets
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const newVisibleCount = Math.min(visibleCount + BATCH_SIZE, allTweets.length);
      
      setTimeout(() => {
        setVisibleCount(newVisibleCount);
        setHasMore(newVisibleCount < allTweets.length);
        setLoadingMore(false);
      }, 300);
    }
  }, [visibleCount, allTweets.length, hasMore, loadingMore]);

  // Get visible tweets
  const visibleTweets = allTweets.slice(0, visibleCount);

  return {
    tweets: visibleTweets,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore
  };
} 