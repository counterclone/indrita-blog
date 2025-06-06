import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Extract the slug from the URL
        const urlParts = url.split('/');
        const slug = urlParts[urlParts.length - 1];

        // Find the article by slug
        const article = await Article.findOne({ slug })
            .select('title excerpt image')
            .lean();

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error('Error fetching article by URL:', error);
        return NextResponse.json(
            { error: 'Failed to fetch article', details: error.message },
            { status: 500 }
        );
    }
} 