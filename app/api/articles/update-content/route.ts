import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const { slug, htmlContent } = await request.json();

        if (!slug || !htmlContent) {
            return NextResponse.json(
                { error: 'Slug and HTML content are required' },
                { status: 400 }
            );
        }

        const article = await Article.findOneAndUpdate(
            { slug },
            { $set: { htmlContent } },
            { new: true }
        );

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error('Error updating article content:', error);
        return NextResponse.json(
            { error: 'Failed to update article content', details: error.message },
            { status: 500 }
        );
    }
} 