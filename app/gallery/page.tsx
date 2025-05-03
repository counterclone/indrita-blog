'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface GalleryItem {
    _id: string;
    imageUrl: string;
    title: string;
    date: string;
}

export default function GalleryPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

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

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Gallery</h1>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {gallery.map((item) => (
                    <div
                        key={item._id}
                        className="break-inside-avoid cursor-pointer transform transition hover:scale-105"
                        onClick={() => setSelectedImage(item)}
                    >
                        <div className="relative aspect-auto rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-end">
                                <div className="w-full p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm opacity-75">
                                        {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                {selectedImage && (
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>{selectedImage.title}</DialogTitle>
                            <DialogDescription>
                                {new Date(selectedImage.date).toLocaleDateString()}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="relative aspect-auto w-full overflow-hidden rounded-lg">
                            <Image
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title}
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
} 