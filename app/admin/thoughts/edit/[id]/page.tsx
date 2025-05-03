'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ThoughtData {
    _id: string;
    embedHtml: string;
    date: string;
}

export default function EditThoughtPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<ThoughtData>({
        _id: '',
        embedHtml: '',
        date: new Date().toISOString()
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Thought</h1>

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