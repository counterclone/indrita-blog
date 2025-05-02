import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Thought from '@/models/Thought';

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
        const thoughts = await Thought.find().sort({ date: -1 });
        return NextResponse.json(thoughts);
    } catch (error) {
        console.error('Error fetching thoughts:', error);
        return NextResponse.json({ error: 'Failed to fetch thoughts' }, { status: 500 });
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

        // Add default values for social metrics if not provided
        const thoughtData = {
            ...data,
            likes: data.likes || 0,
            retweets: data.retweets || 0,
            replies: data.replies || 0,
            date: data.date || new Date()
        };

        const thought = await Thought.create(thoughtData);
        return NextResponse.json(thought);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to create thought', details: error.message },
            { status: 500 }
        );
    }
}