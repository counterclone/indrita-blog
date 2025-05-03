'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormData {
    imageUrl: string;
    title: string;
}

export default function NewGalleryItemPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        imageUrl: '',
        title: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create gallery item');
            }

            router.push('/admin/gallery');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <Link href="/admin/gallery" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Gallery
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-6">Add New Gallery Item</h1>

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
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Gallery Item'}
                    </Button>
                </div>
            </form>
        </div>
    );
} 