'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ArticleData {
    _id: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    category: string;
    readTime: string;
    slug: string;
    htmlContent?: string;
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<ArticleData>({
        _id: '',
        title: '',
        excerpt: '',
        image: '',
        author: '',
        category: '',
        readTime: '',
        slug: '',
        htmlContent: ''
    });

    useEffect(() => {
        fetchArticleData();
    }, [params.id]);

    const fetchArticleData = async () => {
        try {
            // Fetch article metadata
            const articleRes = await fetch(`/api/articles/${params.id}`);
            if (!articleRes.ok) throw new Error('Failed to fetch article');
            const article = await articleRes.json();

            // Fetch article content
            const contentRes = await fetch(`/api/article-content/${params.id}`);
            if (!contentRes.ok) throw new Error('Failed to fetch article content');
            const content = await contentRes.json();

            setFormData({
                ...article,
                htmlContent: content.htmlContent
            });
        } catch (err) {
            setError('Failed to load article data');
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
            // Update article metadata
            const articleRes = await fetch(`/api/articles/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    excerpt: formData.excerpt,
                    image: formData.image,
                    author: formData.author,
                    category: formData.category,
                    readTime: formData.readTime,
                    slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                }),
            });

            if (!articleRes.ok) throw new Error('Failed to update article');

            // Update article content
            const contentRes = await fetch(`/api/article-content/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    htmlContent: formData.htmlContent
                }),
            });

            if (!contentRes.ok) throw new Error('Failed to update article content');

            router.push('/admin/articles');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Article</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">Read Time</label>
                    <input
                        type="text"
                        id="readTime"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="htmlContent" className="block text-sm font-medium text-gray-700">Content (HTML)</label>
                    <textarea
                        id="htmlContent"
                        name="htmlContent"
                        value={formData.htmlContent}
                        onChange={handleChange}
                        rows={15}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/articles')}
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