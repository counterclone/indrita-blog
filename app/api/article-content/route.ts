import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import ArticleContent from '@/models/ArticleContent';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        // Validate required fields
        if (!data.articleId || !data.slug || !data.htmlContent) {
            return NextResponse.json(
                { error: 'Article ID, slug, and HTML content are required' },
                { status: 400 }
            );
        }

        const articleContent = await ArticleContent.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json(articleContent);
    } catch (error: any) {
        console.error('Error creating article content:', error);
        return NextResponse.json(
            { error: 'Failed to create article content', details: error.message },
            { status: 500 }
        );
    }
} 