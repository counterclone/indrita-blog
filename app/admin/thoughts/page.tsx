'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Thought {
    _id: string;
    embedHtml: string;
    date: string;
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
                        <li key={thought._id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: thought.embedHtml }} 
                                        className="mb-2"
                                    />
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <span>{new Date(thought.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="ml-4 flex items-center space-x-4">
                                    <Link
                                        href={`/admin/thoughts/edit/${thought._id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(thought._id)}
                                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 