import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

export async function GET() {
    try {
        await connectDB();
        const gallery = await Gallery.find().sort({ date: -1 });
        return NextResponse.json(gallery);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch gallery items', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        // Validate required fields
        if (!data.imageUrl || !data.title) {
            return NextResponse.json(
                { error: 'Image URL and title are required' },
                { status: 400 }
            );
        }

        const galleryData = {
            imageUrl: data.imageUrl,
            title: data.title,
            date: data.date || new Date()
        };

        const galleryItem = await Gallery.create(galleryData);
        return NextResponse.json(galleryItem);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to create gallery item', details: error.message },
            { status: 500 }
        );
    }
} 