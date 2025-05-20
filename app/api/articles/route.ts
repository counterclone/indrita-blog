import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import ArticleContent from '@/models/ArticleContent';
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
        
        console.log('Received article data:', data);

        // Validate required fields
        if (!data.title || !data.excerpt || !data.image) {
            return NextResponse.json(
                { error: 'Title, excerpt, and image are required' },
                { status: 400 }
            );
        }

        // Ensure category is an array even if it's empty
        if (!data.category) {
            data.category = [];
        } else if (!Array.isArray(data.category)) {
            // If category somehow isn't an array, convert it
            if (typeof data.category === 'string') {
                data.category = data.category ? [data.category] : [];
            } else {
                data.category = [];
            }
        }

        console.log('Processed category:', data.category);

        // Create the article
        const article = await Article.create({
            ...data,
            date: data.date || new Date(),
            slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        });
        console.log('Created new article:', article);

        // Also create an empty article content document
        try {
            const articleContent = await ArticleContent.create({
                articleId: article._id.toString(),
                slug: article.slug,
                htmlContent: '',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('Created empty article content:', articleContent);
        } catch (contentError) {
            console.error('Error creating article content:', contentError);
            // Don't fail the whole operation if content creation fails
        }

        // Send notification about new article
        if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
            try {
                const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://firsthand.akhilhanda.com';
                const articleUrl = `${siteUrl}/articles/${article.slug}`;
                
                await sendNewArticleNotification(
                    article.title,
                    article.excerpt,
                    articleUrl
                );
                
                console.log('Email notification sent for new article');
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
                // Don't fail the request if email fails
            }
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
