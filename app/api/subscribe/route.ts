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

        // Check if subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.subscribed) {
                return NextResponse.json(
                    { error: 'Email already subscribed' },
                    { status: 400 }
                );
            } else {
                // Reactivate subscription
                existingSubscriber.subscribed = true;
                await existingSubscriber.save();
                return NextResponse.json({ message: 'Subscription reactivated' });
            }
        }

        // Create new subscriber
        const subscriber = await Subscriber.create({ email });
        return NextResponse.json({ message: 'Successfully subscribed' });

    } catch (error: any) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe', details: error.message },
            { status: 500 }
        );
    }
} 