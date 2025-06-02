'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, Mail, TestTube } from 'lucide-react';

interface Article {
    _id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string[];
    slug: string;
    htmlContent: string;
    readTime: string;
    image: string;
}

export default function ArticlesPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sendingEmail, setSendingEmail] = useState<string | null>(null);
    const [sendingTestEmail, setSendingTestEmail] = useState<string | null>(null);

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
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete article');
            
            setArticles(articles.filter(article => article._id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete article');
        }
    };

    const handleSendEmail = async (id: string) => {
        if (!confirm('Are you sure you want to send email notifications for this article?')) return;

        setSendingEmail(id);
        try {
            const response = await fetch('/api/articles/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articleId: id }),
            });

            if (!response.ok) throw new Error('Failed to send email notifications');
            
            const data = await response.json();
            alert('Email notifications sent successfully!');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send email notifications');
        } finally {
            setSendingEmail(null);
        }
    };

    const handleSendTestEmail = async (id: string) => {
        if (!confirm('Are you sure you want to send test email notifications for this article?')) return;

        setSendingTestEmail(id);
        try {
            const response = await fetch('/api/articles/send-test-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articleId: id }),
            });

            if (!response.ok) throw new Error('Failed to send test email notifications');
            
            const data = await response.json();
            alert('Test email notifications sent successfully!');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send test email notifications');
        } finally {
            setSendingTestEmail(null);
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Articles</h1>
                <Link href="/admin/articles/new">
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create New Article
                    </Button>
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {articles.map((article) => (
                        <li key={article._id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                        {article.title}
                                    </h3>
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                        <span>{Array.isArray(article.category) ? article.category.join(", ") : article.category}</span>
                                        <span className="mx-2">•</span>
                                        <span>{new Date(article.date).toLocaleDateString()}</span>
                                        <span className="mx-2">•</span>
                                        <span>{article.author}</span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/articles/edit/${article._id}`}>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(article._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleSendEmail(article._id)}
                                        disabled={sendingEmail === article._id}
                                        title="Send email to all subscribers"
                                    >
                                        {sendingEmail === article._id ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                        ) : (
                                            <Mail className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleSendTestEmail(article._id)}
                                        disabled={sendingTestEmail === article._id}
                                        title="Send test email"
                                    >
                                        {sendingTestEmail === article._id ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                        ) : (
                                            <TestTube className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 