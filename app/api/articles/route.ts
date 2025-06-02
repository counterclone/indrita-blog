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
        await connectDB();
        const articles = await Article.find({}).sort({ date: -1 });
        return NextResponse.json(articles);
    } catch (error: any) {
        console.error('Error fetching articles:', error);
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
