'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Article {
    _id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    slug: string;
}

export default function ArticlesPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch('/api/articles');
            if (!response.ok) throw new Error('Failed to fetch articles');
            const data = await response.json();
            setArticles(data);
        } catch (err) {
            setError('Failed to load articles');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete article');

            // Also delete the article content
            await fetch(`/api/article-content/${id}`, {
                method: 'DELETE',
            });

            setArticles(articles.filter(article => article._id !== id));
        } catch (err) {
            console.error('Error deleting article:', err);
            alert('Failed to delete article');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Articles</h1>
                <Link
                    href="/admin/articles/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Create New Article
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {articles.map((article) => (
                        <li key={article._id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">
                                            {article.title}
                                        </h3>
                                        <div className="mt-1 flex items-center text-sm text-gray-500">
                                            <span>{article.category}</span>
                                            <span className="mx-2">•</span>
                                            <span>{new Date(article.date).toLocaleDateString()}</span>
                                            <span className="mx-2">•</span>
                                            <span>{article.author}</span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            onClick={() => handleDelete(article._id)}
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