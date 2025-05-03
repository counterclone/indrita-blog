'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormData {
    title: string;
    excerpt: string;
    image: string;
    author: string;
    category: string;
    readTime: string;
    htmlContent: string;
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        excerpt: '',
        image: '',
        author: '',
        category: '',
        readTime: '',
        htmlContent: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchArticleData();
    }, []);

    const fetchArticleData = async () => {
        try {
            // Fetch article data
            const articleResponse = await fetch(`/api/articles/${params.id}`);
            if (!articleResponse.ok) throw new Error('Failed to fetch article');
            const article = await articleResponse.json();

            // Fetch article content
            const contentResponse = await fetch(`/api/article-content/${params.id}`);
            if (!contentResponse.ok) throw new Error('Failed to fetch article content');
            const content = await contentResponse.json();

            setFormData({
                title: article.title,
                excerpt: article.excerpt,
                image: article.image,
                author: article.author,
                category: article.category,
                readTime: article.readTime,
                htmlContent: content.htmlContent
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            // Update article data
            const articleResponse = await fetch(`/api/articles/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
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

            if (!articleResponse.ok) {
                const data = await articleResponse.json();
                throw new Error(data.error || 'Failed to update article');
            }

            const article = await articleResponse.json();

            // Update article content
            const contentResponse = await fetch(`/api/article-content/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    articleId: article._id,
                    slug: article.slug,
                    htmlContent: formData.htmlContent
                }),
            });

            if (!contentResponse.ok) {
                const data = await contentResponse.json();
                throw new Error(data.error || 'Failed to update article content');
            }

            router.push('/admin/articles');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <Link href="/admin/articles" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Articles
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-6">Edit Article</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="Enter excerpt"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                        id="image"
                        name="image"
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="readTime">Read Time</Label>
                        <Input
                            id="readTime"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleChange}
                            placeholder="e.g., 5 min read"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="htmlContent">Content (HTML)</Label>
                    <Textarea
                        id="htmlContent"
                        name="htmlContent"
                        value={formData.htmlContent}
                        onChange={handleChange}
                        rows={15}
                        className="font-mono"
                        placeholder="Enter article content in HTML format"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/admin/articles')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
} 