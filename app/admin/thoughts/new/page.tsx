'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewThoughtPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        embedHtml: '',
        date: new Date().toISOString().split('T')[0], // Default to today's date
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
                    embedHtml: formData.embedHtml,
                    date: new Date(formData.date)
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
                    <label htmlFor="embedHtml" className="block text-sm font-medium text-gray-700">
                        Twitter Embed HTML
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                        Paste the Twitter embed code here. You can get this by clicking "Embed Tweet" on Twitter.
                    </p>
                    <textarea
                        id="embedHtml"
                        name="embedHtml"
                        value={formData.embedHtml}
                        onChange={handleChange}
                        rows={10}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Tweet Date
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                        Enter the original date of the tweet
                    </p>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
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