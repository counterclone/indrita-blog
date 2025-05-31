import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
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

        // Send email notification
        const articleUrl = `https://www.akhilhanda.com/article-content/${article.slug}`;
        const notificationResult = await sendNewArticleNotification(
            article.title,
            article.excerpt,
            articleUrl
        );

        return NextResponse.json({
            success: true,
            message: 'Email notification sent successfully',
            details: notificationResult
        });
    } catch (error: any) {
        console.error('Error sending email notification:', error);
        return NextResponse.json(
            { error: 'Failed to send email notification', details: error.message },
            { status: 500 }
        );
    }
} 