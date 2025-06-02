import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        // Validate required fields
        if (!data.title || !data.slug || !data.htmlContent) {
            return NextResponse.json(
                { error: 'Title, slug, and HTML content are required' },
                { status: 400 }
            );
        }

        try {
            const article = await Article.create({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            return NextResponse.json(article);
        } catch (dbError: any) {
            // Check for duplicate key error (commonly caused by duplicate slug)
            if (dbError.code === 11000 && dbError.keyPattern?.slug) {
                return NextResponse.json(
                    { error: 'An article with this slug already exists', details: 'Please use a different title' },
                    { status: 409 }
                );
            }
            
            // Handle other database errors
            throw dbError;
        }
    } catch (error: any) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { 
                error: 'Failed to create article', 
                details: error.message,
                code: error.code || 'unknown'
            },
            { status: 500 }
        );
    }
} 