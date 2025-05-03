import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

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
    } catch (error) {
        console.error('Detailed error in GET /api/articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const data = await request.json();
        const article = await Article.create(data);
        return NextResponse.json(article);
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: 'Failed to create article', details: error.message },
            { status: 500 }
        );
    }
}
