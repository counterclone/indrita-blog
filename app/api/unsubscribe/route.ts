import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ActiveSubscriber from '@/models/ActiveSubscriber';
import UnsubscribedUser from '@/models/UnsubscribedUser';

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

        // Find the active subscriber
        const subscriber = await ActiveSubscriber.findOne({ email });
        
        if (!subscriber) {
            // Check if already unsubscribed
            const unsubscribed = await UnsubscribedUser.findOne({ email });
            if (unsubscribed) {
                return NextResponse.json({ 
                    message: 'You are already unsubscribed' 
                });
            }
            return NextResponse.json(
                { error: 'Email not found in our subscriber list' },
                { status: 404 }
            );
        }

        // Move subscriber to unsubscribed collection
        await UnsubscribedUser.create({
            email: subscriber.email,
            previousSubscriptionDate: subscriber.subscribedAt,
            unsubscribedAt: new Date()
        });

        // Remove from active subscribers
        await ActiveSubscriber.deleteOne({ email });

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