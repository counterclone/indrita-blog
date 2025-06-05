import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import mongoose from 'mongoose';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        console.log('Fetching article with ID:', params.id);
        await connectDB();

        // First try to find by _id
        let article = await Article.findById(params.id);

        // If not found, try to find by slug
        if (!article) {
            console.log('Article not found by ID, trying with slug');
            article = await Article.findOne({ slug: params.id });
        }

        // If still not found, return 404
        if (!article) {
            console.log('Article not found for ID/slug:', params.id);
            return NextResponse.json(
                { error: 'Article not found', id: params.id },
                { status: 404 }
            );
        }

        console.log('Found article:', article.title);
        return NextResponse.json(article, {
            headers: {
                'Cache-Control': 'public, max-age=600, stale-while-revalidate=300',
            }
        });
    } catch (error: any) {
        console.error('Error fetching article:', error);
        return NextResponse.json(
            { error: 'Failed to fetch article', details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        console.log('Updating article with ID:', params.id);
        console.log('Update data:', data);

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

        const article = await Article.findByIdAndUpdate(
            params.id,
            { ...data, updatedAt: new Date() },
            { new: true }
        );

        if (!article) {
            console.log('Article not found for update');
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        console.log('Updated article:', article);
        return NextResponse.json(article);
    } catch (error: any) {
        console.error('Error updating article:', error);
        return NextResponse.json(
            { error: 'Failed to update article', details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions) as CustomSession;
        console.log('Delete request received for article:', params.id);
        console.log('Session:', session);

        if (!session?.user?.role || session.user.role !== 'admin') {
            console.log('Unauthorized delete attempt:', {
                hasSession: !!session,
                userRole: session?.user?.role
            });
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        console.log('MongoDB connected successfully');

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            console.log('Invalid article ID format:', params.id);
            return NextResponse.json(
                { error: 'Invalid article ID format' },
                { status: 400 }
            );
        }

        console.log('Attempting to delete article:', params.id);
        const article = await Article.findByIdAndDelete(params.id);

        if (!article) {
            console.log('Article not found for deletion:', params.id);
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        console.log('Article deleted successfully:', params.id);
        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting article:', {
            articleId: params.id,
            error: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            {
                error: 'Failed to delete article',
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
} 