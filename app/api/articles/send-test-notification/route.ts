import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import TestSubscriber from '@/models/TestSubscriber';
import { sendNewArticleNotification } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { articleId } = await request.json();

        if (!articleId) {
            return NextResponse.json(
                { error: 'Article ID is required' },
                { status: 400 }
            );
        }

        // Find the article
        const article = await Article.findById(articleId);
        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        // Get test subscribers
        const testSubscribers = await TestSubscriber.find();
        if (testSubscribers.length === 0) {
            return NextResponse.json(
                { error: 'No test subscribers found' },
                { status: 404 }
            );
        }

        // Send email notification to test subscribers
        const articleUrl = `https://www.akhilhanda.com/article-content/${article.slug}`;
        let successCount = 0;

        for (const subscriber of testSubscribers) {
            try {
                await sendNewArticleNotification(
                    article.title,
                    article.excerpt,
                    articleUrl,
                    [subscriber.email] // Send to individual test subscriber
                );
                successCount++;
            } catch (error) {
                console.error(`Failed to send test email to ${subscriber.email}:`, error);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Test email notification sent successfully',
            details: {
                successCount,
                totalTestSubscribers: testSubscribers.length
            }
        });
    } catch (error: any) {
        console.error('Error sending test email notification:', error);
        return NextResponse.json(
            { error: 'Failed to send test email notification', details: error.message },
            { status: 500 }
        );
    }
} 