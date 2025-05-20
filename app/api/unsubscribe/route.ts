import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Find the subscriber
        const subscriber = await Subscriber.findOne({ email });
        
        if (!subscriber) {
            return NextResponse.json(
                { error: 'Email not found in our subscriber list' },
                { status: 404 }
            );
        }

        // If already unsubscribed
        if (!subscriber.subscribed) {
            return NextResponse.json({ 
                message: 'You are already unsubscribed' 
            });
        }

        // Update the subscriber status
        subscriber.subscribed = false;
        await subscriber.save();

        return NextResponse.json({ 
            message: 'You have been successfully unsubscribed' 
        });

    } catch (error: any) {
        console.error('Unsubscribe error:', error);
        return NextResponse.json(
            { error: 'Failed to process unsubscribe request', details: error.message },
            { status: 500 }
        );
    }
} 