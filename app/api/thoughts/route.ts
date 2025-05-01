import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Thought from '@/models/Thought';

export async function GET() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await connectDB();
        console.log('MongoDB connected successfully');

        console.log('Fetching thoughts...');
        const thoughts = await Thought.find().sort({ date: -1 });
        console.log('Thoughts fetched:', thoughts);

        if (!thoughts || thoughts.length === 0) {
            console.log('No thoughts found in database');
        }

        return NextResponse.json(thoughts);
    } catch (error) {
        console.error('Detailed error in GET /api/thoughts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch thoughts', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        const thought = await Thought.create(data);
        return NextResponse.json(thought);
    } catch (error) {
        console.error('Error creating thought:', error);
        return NextResponse.json(
            { error: 'Failed to create thought', details: error.message },
            { status: 500 }
        );
    }
}