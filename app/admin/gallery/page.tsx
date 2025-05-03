'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface GalleryItem {
    _id: string;
    imageUrl: string;
    title: string;
    date: string;
}

export default function AdminGalleryPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await fetch('/api/gallery');
            if (!response.ok) throw new Error('Failed to fetch gallery items');
            const data = await response.json();
            setGallery(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gallery item?')) return;

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete gallery item');
            
            setGallery(gallery.filter(item => item._id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete gallery item');
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gallery Management</h1>
                <Link href="/admin/gallery/new">
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Item
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative aspect-square">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {new Date(item.date).toLocaleDateString()}
                            </p>
                            <div className="flex justify-end gap-2">
                                <Link href={`/admin/gallery/edit/${item._id}`}>
                                    <Button variant="outline" size="sm">
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 