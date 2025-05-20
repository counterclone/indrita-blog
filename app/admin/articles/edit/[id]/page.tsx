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
    category: string[];
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
        category: [],
        readTime: '',
        htmlContent: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        "AI in Banking",
        "Digital Transformation",
        "Fintech Innovation",
        "Global Trends"
    ];

    useEffect(() => {
        fetchArticleData();
    }, []);

    const fetchArticleData = async () => {
        try {
            console.log('Fetching article data for ID:', params.id);
            
            // Fetch article data
            const articleResponse = await fetch(`/api/articles/${params.id}`);
            if (!articleResponse.ok) {
                const errorData = await articleResponse.json();
                console.error('Failed to fetch article:', errorData);
                throw new Error(errorData.error || 'Failed to fetch article');
            }
            const article = await articleResponse.json();
            console.log('Article data fetched:', article);

            // Convert category to array if it's a string
            let categoryArray: string[] = [];
            if (article.category) {
                if (Array.isArray(article.category)) {
                    categoryArray = article.category;
                } else if (typeof article.category === 'string') {
                    // Handle legacy data where category was a single string
                    categoryArray = [article.category];
                }
            }

            // Fetch article content
            try {
                const contentResponse = await fetch(`/api/article-content/${params.id}`);
                if (!contentResponse.ok) {
                    const errorData = await contentResponse.json();
                    console.error('Failed to fetch article content:', errorData);
                    // Don't throw here, just set a default empty content
                    setFormData({
                        title: article.title || '',
                        excerpt: article.excerpt || '',
                        image: article.image || '',
                        author: article.author || '',
                        category: categoryArray,
                        readTime: article.readTime || '',
                        htmlContent: '' // Empty content as fallback
                    });
                    setError('Article content not found. Starting with empty content that will be created on save.');
                } else {
                    const content = await contentResponse.json();
                    console.log('Article content fetched:', content);
                    setFormData({
                        title: article.title || '',
                        excerpt: article.excerpt || '',
                        image: article.image || '',
                        author: article.author || '',
                        category: categoryArray,
                        readTime: article.readTime || '',
                        htmlContent: content.htmlContent || ''
                    });
                }
            } catch (contentErr) {
                console.error('Error fetching content:', contentErr);
                // Still allow editing the article even if content fetch fails
                setFormData({
                    title: article.title || '',
                    excerpt: article.excerpt || '',
                    image: article.image || '',
                    author: article.author || '',
                    category: categoryArray,
                    readTime: article.readTime || '',
                    htmlContent: '' // Empty content as fallback
                });
                setError('Error loading article content. Starting with empty content that will be created on save.');
            }
        } catch (err) {
            console.error('Error in fetchArticleData:', err);
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

    const handleCategoryChange = (category: string) => {
        setFormData(prev => {
            if (prev.category.includes(category)) {
                // Remove category if it's already selected
                return {
                    ...prev,
                    category: prev.category.filter(cat => cat !== category)
                };
            } else {
                // Add category if it's not selected
                return {
                    ...prev,
                    category: [...prev.category, category]
                };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            // Log what we're submitting
            console.log('Submitting form data:', formData);
            console.log('Category type:', typeof formData.category, 'Value:', formData.category);
            
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
                console.error('API error response:', data);
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
                    articleId: params.id,
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
                        <Label>Categories</Label>
                        <div className="space-y-2 pt-1">
                            {categories.map((category) => (
                                <div key={category} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${category}`}
                                        checked={formData.category.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
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