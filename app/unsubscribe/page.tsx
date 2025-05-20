'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if email was provided in URL parameters
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unsubscribe');
      }

      setStatus('success');
      setMessage(data.message || 'You have been successfully unsubscribed');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Failed to unsubscribe');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Unsubscribe</h1>
      
      {status === 'success' ? (
        <div className="text-center">
          <div className="mb-4 text-green-600">{message}</div>
          <p className="text-gray-600">
            We're sorry to see you go. You can always subscribe again in the future.
          </p>
          <Button className="mt-4" asChild>
            <a href="/">Return to Homepage</a>
          </Button>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Please enter your email address to unsubscribe from our newsletter.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Processing...' : 'Unsubscribe'}
            </Button>
          </form>
          
          {status === 'error' && (
            <div className="mt-4 text-red-600 text-center">
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
} 