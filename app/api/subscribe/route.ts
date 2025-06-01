import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ActiveSubscriber from '@/models/ActiveSubscriber';
import UnsubscribedUser from '@/models/UnsubscribedUser';
import { sendWelcomeEmail } from '@/lib/email';

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

        // Check if already an active subscriber
        const existingSubscriber = await ActiveSubscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 400 }
            );
        }

        // Check if user was previously unsubscribed
        const unsubscribedUser = await UnsubscribedUser.findOne({ email });
        if (unsubscribedUser) {
            // Move user back to active subscribers
            await ActiveSubscriber.create({
                email,
                subscribedAt: new Date()
            });
            // Remove from unsubscribed users
            await UnsubscribedUser.deleteOne({ email });
            return NextResponse.json({ message: 'Subscription reactivated' });
        }

        // Create new subscriber
        await ActiveSubscriber.create({ email });

        // Send welcome email
        try {
            await sendWelcomeEmail(email);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't fail the subscription if welcome email fails
        }

        return NextResponse.json({ message: 'Successfully subscribed' });

    } catch (error: any) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe', details: error.message },
            { status: 500 }
        );
    }
} 