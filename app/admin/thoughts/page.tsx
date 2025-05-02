'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Thought {
    _id: string;
    content: string;
    date: string;
    xUrl: string;
    likes: number;
    retweets: number;
    replies: number;
}

export default function ThoughtsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
            return;
        }
        if (status === 'authenticated') {
            fetchThoughts();
        }
    }, [status]);

    const fetchThoughts = async () => {
        try {
            const response = await fetch('/api/thoughts', {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch thoughts');
            const data = await response.json();
            setThoughts(data);
        } catch (err) {
            setError('Failed to load thoughts');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this thought?')) return;

        try {
            const response = await fetch(`/api/thoughts/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete thought');
            }

            setThoughts(thoughts.filter(thought => thought._id !== id));
        } catch (err) {
            console.error('Error deleting thought:', err);
            alert('Failed to delete thought');
        }
    };

    if (status === 'loading' || isLoading) return <div>Loading...</div>;
    if (status === 'unauthenticated') return null;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Thoughts</h1>
                <Link
                    href="/admin/thoughts/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Create New Thought
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {thoughts.map((thought) => (
                        <li key={thought._id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-lg text-gray-900">
                                            {thought.content}
                                        </p>
                                        <div className="mt-1 flex items-center text-sm text-gray-500">
                                            <span>{new Date(thought.date).toLocaleDateString()}</span>
                                            <span className="mx-2">•</span>
                                            <span>Likes: {thought.likes}</span>
                                            <span className="mx-2">•</span>
                                            <span>Retweets: {thought.retweets}</span>
                                            <span className="mx-2">•</span>
                                            <span>Replies: {thought.replies}</span>
                                        </div>
                                        {thought.xUrl && (
                                            <a
                                                href={thought.xUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                View on X (Twitter)
                                            </a>
                                        )}
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            onClick={() => handleDelete(thought._id)}
                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 