import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Thought from '@/models/Thought';
import mongoose from 'mongoose';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const thought = await Thought.findById(params.id);

        if (!thought) {
            return NextResponse.json(
                { error: 'Thought not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(thought);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch thought', details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        // Validate required fields
        if (!data.embedHtml) {
            return NextResponse.json(
                { error: 'Twitter embed HTML is required' },
                { status: 400 }
            );
        }

        const thought = await Thought.findByIdAndUpdate(
            params.id,
            { embedHtml: data.embedHtml, updatedAt: new Date() },
            { new: true }
        );

        if (!thought) {
            return NextResponse.json(
                { error: 'Thought not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(thought);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to update thought', details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        console.log('DELETE request received for thought:', params.id);

        const session = await getServerSession(authOptions) as CustomSession;
        console.log('Session status:', session ? 'authenticated' : 'not authenticated');

        if (!session?.user?.role || session.user.role !== 'admin') {
            console.log('Unauthorized attempt to delete thought');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        console.log('Connected to MongoDB');

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            console.log('Invalid thought ID format:', params.id);
            return NextResponse.json(
                { error: 'Invalid thought ID format' },
                { status: 400 }
            );
        }

        const thought = await Thought.findByIdAndDelete(params.id);
        console.log('Delete operation result:', thought);

        if (!thought) {
            console.log('Thought not found:', params.id);
            return NextResponse.json(
                { error: 'Thought not found' },
                { status: 404 }
            );
        }

        console.log('Thought deleted successfully:', params.id);
        return NextResponse.json({ message: 'Thought deleted successfully' });
    } catch (error: any) {
        console.error('Error in DELETE /api/thoughts/[id]:', error);
        return NextResponse.json(
            {
                error: 'Failed to delete thought',
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
} 