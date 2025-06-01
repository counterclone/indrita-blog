import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import ActiveSubscriber from '@/models/ActiveSubscriber';
import UnsubscribedUser from '@/models/UnsubscribedUser';
import { sendWelcomeEmail } from '@/lib/email';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

// Get all subscribers (both active and unsubscribed)
export async function GET() {
    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        
        // Get both active and unsubscribed users
        const activeSubscribers = await ActiveSubscriber.find().sort({ subscribedAt: -1 });
        const unsubscribedUsers = await UnsubscribedUser.find().sort({ unsubscribedAt: -1 });

        // Format the response
        const subscribers = [
            ...activeSubscribers.map(sub => ({
                _id: sub._id,
                email: sub.email,
                subscribed: true,
                subscribedAt: sub.subscribedAt
            })),
            ...unsubscribedUsers.map(sub => ({
                _id: sub._id,
                email: sub.email,
                subscribed: false,
                subscribedAt: sub.previousSubscriptionDate,
                unsubscribedAt: sub.unsubscribedAt
            }))
        ];

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
                const normalizedEmail = email.toLowerCase();
                // Check if already an active subscriber
                const existingActive = await ActiveSubscriber.findOne({ email: normalizedEmail });
                if (existingActive) {
                    results.existing.push(email);
                    continue;
                }

                // Check if user was previously unsubscribed
                const unsubscribed = await UnsubscribedUser.findOne({ email: normalizedEmail });
                if (unsubscribed) {
                    // Move back to active subscribers
                    await ActiveSubscriber.create({
                        email: normalizedEmail,
                        subscribedAt: new Date()
                    });
                    await UnsubscribedUser.deleteOne({ email: normalizedEmail });
                    results.reactivated.push(email);
                } else {
                    // Create new subscriber
                    await ActiveSubscriber.create({ email: normalizedEmail });
                    results.added.push(email);
                    
                    // Send welcome email to new subscribers
                    try {
                        await sendWelcomeEmail(normalizedEmail);
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

        if (subscribed) {
            // Moving from unsubscribed to active
            const unsubscribed = await UnsubscribedUser.findById(subscriberId);
            if (!unsubscribed) {
                return NextResponse.json(
                    { error: 'Subscriber not found' },
                    { status: 404 }
                );
            }

            // Create active subscriber
            await ActiveSubscriber.create({
                email: unsubscribed.email,
                subscribedAt: new Date()
            });

            // Remove from unsubscribed
            await UnsubscribedUser.deleteOne({ _id: subscriberId });
        } else {
            // Moving from active to unsubscribed
            const active = await ActiveSubscriber.findById(subscriberId);
            if (!active) {
                return NextResponse.json(
                    { error: 'Subscriber not found' },
                    { status: 404 }
                );
            }

            // Create unsubscribed user
            await UnsubscribedUser.create({
                email: active.email,
                previousSubscriptionDate: active.subscribedAt,
                unsubscribedAt: new Date()
            });

            // Remove from active subscribers
            await ActiveSubscriber.deleteOne({ _id: subscriberId });
        }

        return NextResponse.json({
            message: `Subscriber ${subscribed ? 'activated' : 'deactivated'} successfully`
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

        // Try to delete from active subscribers first
        let deleted = await ActiveSubscriber.findByIdAndDelete(subscriberId);
        if (!deleted) {
            // If not found in active, try unsubscribed
            deleted = await UnsubscribedUser.findByIdAndDelete(subscriberId);
        }

        if (!deleted) {
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