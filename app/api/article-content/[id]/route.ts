import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import ArticleContent from '@/models/ArticleContent';

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
        await connectDB();
        const content = await ArticleContent.findOne({ articleId: params.id });

        if (!content) {
            return NextResponse.json(
                { error: 'Article content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(content);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch article content', details: error.message },
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

        const content = await ArticleContent.findOneAndUpdate(
            { articleId: params.id },
            { ...data, updatedAt: new Date() },
            { new: true }
        );

        if (!content) {
            return NextResponse.json(
                { error: 'Article content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(content);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to update article content', details: error.message },
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

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const content = await ArticleContent.findOneAndDelete({ articleId: params.id });

        if (!content) {
            return NextResponse.json(
                { error: 'Article content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Article content deleted successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to delete article content', details: error.message },
            { status: 500 }
        );
    }
} 