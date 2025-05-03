import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import mongoose from 'mongoose';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const galleryItem = await Gallery.findById(params.id);

        if (!galleryItem) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
        }

        return NextResponse.json(galleryItem);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch gallery item', details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const data = await request.json();

        // Validate required fields
        if (!data.imageUrl || !data.title) {
            return NextResponse.json(
                { error: 'Image URL and title are required' },
                { status: 400 }
            );
        }

        const galleryItem = await Gallery.findByIdAndUpdate(
            params.id,
            {
                imageUrl: data.imageUrl,
                title: data.title,
                date: data.date || new Date()
            },
            { new: true }
        );

        if (!galleryItem) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
        }

        return NextResponse.json(galleryItem);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to update gallery item', details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const galleryItem = await Gallery.findByIdAndDelete(params.id);

        if (!galleryItem) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Gallery item deleted successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to delete gallery item', details: error.message },
            { status: 500 }
        );
    }
} 