import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { sendWelcomeEmail } from '@/lib/email';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

// Get all subscribers
export async function GET() {
    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        return NextResponse.json(subscribers);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch subscribers', details: error.message },
            { status: 500 }
        );
    }
}

// Add multiple subscribers
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { emails } = await request.json();
        if (!emails || !Array.isArray(emails)) {
            return NextResponse.json(
                { error: 'Emails array is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const results = {
            added: [] as string[],
            existing: [] as string[],
            invalid: [] as string[],
            reactivated: [] as string[]
        };

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        for (const email of emails) {
            // Validate email format
            if (!emailRegex.test(email)) {
                results.invalid.push(email);
                continue;
            }

            try {
                // Check if subscriber exists
                const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });

                if (existingSubscriber) {
                    if (!existingSubscriber.subscribed) {
                        existingSubscriber.subscribed = true;
                        await existingSubscriber.save();
                        results.reactivated.push(email);
                    } else {
                        results.existing.push(email);
                    }
                } else {
                    await Subscriber.create({ email: email.toLowerCase() });
                    results.added.push(email);
                    
                    // Send welcome email to new subscribers
                    try {
                        await sendWelcomeEmail(email.toLowerCase());
                    } catch (emailError) {
                        console.error(`Failed to send welcome email to ${email}:`, emailError);
                        // Don't fail the subscription if welcome email fails
                    }
                }
            } catch (error) {
                console.error(`Error processing email ${email}:`, error);
                results.invalid.push(email);
            }
        }

        return NextResponse.json({
            message: 'Subscribers processed',
            results
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to add subscribers', details: error.message },
            { status: 500 }
        );
    }
}

// Update subscriber status
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subscriberId, subscribed } = await request.json();
        if (!subscriberId) {
            return NextResponse.json(
                { error: 'Subscriber ID is required' },
                { status: 400 }
            );
        }

        await connectDB();
        const subscriber = await Subscriber.findById(subscriberId);

        if (!subscriber) {
            return NextResponse.json(
                { error: 'Subscriber not found' },
                { status: 404 }
            );
        }

        subscriber.subscribed = subscribed;
        await subscriber.save();

        return NextResponse.json({
            message: `Subscriber ${subscribed ? 'activated' : 'deactivated'} successfully`,
            subscriber
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to update subscriber', details: error.message },
            { status: 500 }
        );
    }
}

// Delete subscriber
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const subscriberId = searchParams.get('id');

        if (!subscriberId) {
            return NextResponse.json(
                { error: 'Subscriber ID is required' },
                { status: 400 }
            );
        }

        await connectDB();
        const subscriber = await Subscriber.findByIdAndDelete(subscriberId);

        if (!subscriber) {
            return NextResponse.json(
                { error: 'Subscriber not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Subscriber deleted successfully'
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to delete subscriber', details: error.message },
            { status: 500 }
        );
    }
} 