"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Repeat, Heart } from "lucide-react";

interface Thought {
  _id: string;  // Changed from id to _id to match MongoDB's default
  content: string;
  date: string;
  xUrl: string;
  likes: number;
  retweets: number;
  replies: number;
}

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // Add this to ensure consistent timezone
  });
};

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          const errorData = await response.text();
          console.error('Error response:', errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        setThoughts(data);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
        setError('Failed to load thoughts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
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

        <div className="space-y-6">
          {thoughts.map((thought) => (
            <div
              key={thought._id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-800 mb-4">{thought.content}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{formatDate(thought.date)}</span>
                
                <div className="flex items-center space-x-4">
                  <a
                    href={thought.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {thought.likes}
                  </a>
                  <a
                    href={thought.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600"
                  >
                    <Repeat className="w-4 h-4 mr-1" />
                    {thought.retweets}
                  </a>
                  <a
                    href={thought.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {thought.replies}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}