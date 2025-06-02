import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { sendNewArticleNotification } from '@/lib/email';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

export async function GET() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await connectDB();
        console.log('MongoDB connected successfully');

        console.log('Fetching articles...');
        // Only fetch fields needed for article cards/lists, exclude htmlContent
        const articles = await Article.find()
            .select('title excerpt image date author category readTime slug _id createdAt updatedAt')
            .sort({ date: -1 })
            .lean();
        console.log('Articles fetched:', articles.length);

        if (!articles || articles.length === 0) {
            console.log('No articles found in database');
            return NextResponse.json([], {
                headers: {
                    'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
                }
            });
        }

        return NextResponse.json(articles, {
            headers: {
                'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
            }
        });
    } catch (error: any) {
        console.error('Detailed error in GET /api/articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        // Create the article
        const article = await Article.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Send notification about new article
        try {
            await sendNewArticleNotification(article);
        } catch (emailError) {
            console.error('Error sending article notification:', emailError);
            // Don't fail the operation if email fails
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: 'Failed to create article', details: error.message },
            { status: 500 }
        );
    }
}
