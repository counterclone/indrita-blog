'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewThoughtPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        content: '',
        xUrl: '',
        likes: '0',
        retweets: '0',
        replies: '0'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/thoughts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    likes: parseInt(formData.likes),
                    retweets: parseInt(formData.retweets),
                    replies: parseInt(formData.replies),
                    date: new Date()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create thought');
            }

            router.push('/admin/thoughts');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Thought</h1>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                    {error}
                </div>
            )}

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
                        disabled={isSubmitting}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Thought'}
                    </button>
                </div>
            </form>
        </div>
    );
} 