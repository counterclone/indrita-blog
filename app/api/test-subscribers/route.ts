import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import TestSubscriber from '@/models/TestSubscriber';

// Get all test subscribers
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const subscribers = await TestSubscriber.find().sort({ createdAt: -1 });
        
        return NextResponse.json(subscribers);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch test subscribers', details: error.message },
            { status: 500 }
        );
    }
}

// Add a new test subscriber
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingSubscriber = await TestSubscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json(
                { error: 'Email already exists in test subscribers' },
                { status: 400 }
            );
        }

        const subscriber = await TestSubscriber.create({ email });
        return NextResponse.json(subscriber);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to add test subscriber', details: error.message },
            { status: 500 }
        );
    }
}

// Delete a test subscriber
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const result = await TestSubscriber.deleteOne({ email });
        
        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Test subscriber not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to delete test subscriber', details: error.message },
            { status: 500 }
        );
    }
} 