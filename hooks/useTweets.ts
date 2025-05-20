import { useState, useEffect, useCallback } from 'react';

interface Thought {
  _id: string;
  embedHtml: string;
  date: string;
}

interface CachedTweet {
  _id: string;
  embedHtml: string;
  date: string;
  renderedHtml?: string;
}

const BATCH_SIZE = 6;
const TWEET_CACHE_KEY = 'cached_tweets';

export function useTweets() {
  const [allTweets, setAllTweets] = useState<CachedTweet[]>([]);
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

  // Fetch tweets from API - only on mount
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
  }, []); // Only run on mount

  // Effect to reload Twitter widgets when new tweets are added
  useEffect(() => {
    const reloadWidgets = () => {
      // @ts-ignore
      if (window.twttr && !loading && !loadingMore) {
        // @ts-ignore
        window.twttr.widgets.load();
      }
    };

    // Initial load
    reloadWidgets();

    // Set up a mutation observer to watch for new tweets
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          reloadWidgets();
        }
      }
    });

    // Start observing the tweet container
    const tweetContainer = document.querySelector('.tweet-container');
    if (tweetContainer) {
      observer.observe(tweetContainer, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, loadingMore]);

  // Load more tweets
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const newVisibleCount = Math.min(visibleCount + BATCH_SIZE, allTweets.length);
      
      // Simulate network delay to prevent rapid loading
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