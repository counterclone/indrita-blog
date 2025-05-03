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
        const articles = await Article.find().sort({ date: -1 }).lean();
        console.log('Articles fetched:', articles.length);

        if (!articles || articles.length === 0) {
            console.log('No articles found in database');
            return NextResponse.json([], {
                headers: {
                    'Cache-Control': 'no-store',
                }
            });
        }

        return NextResponse.json(articles, {
            headers: {
                'Cache-Control': 'no-store',
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

        // Validate required fields
        if (!data.title || !data.excerpt || !data.image) {
            return NextResponse.json(
                { error: 'Title, excerpt, and image are required' },
                { status: 400 }
            );
        }

        // Create article
        const article = await Article.create({
            ...data,
            date: data.date || new Date(),
            slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        });

        // Send notification to subscribers
        try {
            const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/article-content/${article.slug}`;
            await sendNewArticleNotification(article.title, article.excerpt, articleUrl);
        } catch (error) {
            console.error('Failed to send notification:', error);
            // Don't fail the article creation if notification fails
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
