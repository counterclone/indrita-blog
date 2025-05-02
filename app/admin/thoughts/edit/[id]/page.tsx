'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ThoughtData {
    _id: string;
    content: string;
    xUrl: string;
    likes: number;
    retweets: number;
    replies: number;
}

export default function EditThoughtPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<ThoughtData>({
        _id: '',
        content: '',
        xUrl: '',
        likes: 0,
        retweets: 0,
        replies: 0
    });

    useEffect(() => {
        fetchThoughtData();
    }, [params.id]);

    const fetchThoughtData = async () => {
        try {
            const response = await fetch(`/api/thoughts/${params.id}`);
            if (!response.ok) throw new Error('Failed to fetch thought');
            const thought = await response.json();
            setFormData(thought);
        } catch (err) {
            setError('Failed to load thought data');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/thoughts/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to update thought');
            router.push('/admin/thoughts');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'likes' || name === 'retweets' || name === 'replies'
                ? parseInt(value)
                : value
        }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Thought</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="xUrl" className="block text-sm font-medium text-gray-700">
                        X (Twitter) URL
                    </label>
                    <input
                        type="url"
                        id="xUrl"
                        name="xUrl"
                        value={formData.xUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="likes" className="block text-sm font-medium text-gray-700">
                            Likes
                        </label>
                        <input
                            type="number"
                            id="likes"
                            name="likes"
                            value={formData.likes}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="retweets" className="block text-sm font-medium text-gray-700">
                            Retweets
                        </label>
                        <input
                            type="number"
                            id="retweets"
                            name="retweets"
                            value={formData.retweets}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="replies" className="block text-sm font-medium text-gray-700">
                            Replies
                        </label>
                        <input
                            type="number"
                            id="replies"
                            name="replies"
                            value={formData.replies}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/thoughts')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
} 