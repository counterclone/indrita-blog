import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

interface CustomSession {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

// Helper function to ensure article content exists
async function ensureArticleContent(articleId: string) {
    console.log(`Ensuring content exists for article ${articleId}`);
    
    // Check if content already exists
    let content = await Article.findOne({ slug: articleId });
    
    // If content exists, return it
    if (content) {
        console.log(`Content already exists for article ${articleId}`);
        return content;
    }
    
    // If no content exists, create empty content
    console.log(`No content found for article ${articleId}, creating empty content`);
    
    // Get the article to get the slug
    const article = await Article.findById(articleId);
    if (!article) {
        console.log(`Article ${articleId} not found in database`);
        return null;
    }
    
    // Generate a unique slug based on the article slug
    let slug = article.slug;
    if (!slug) {
        // Generate slug from title if available, otherwise use a timestamp
        slug = article.title 
            ? article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            : `article-${articleId}`;
    }
    
    // Ensure slug is unique by appending timestamp if needed
    const slugExists = await Article.findOne({ slug });
    if (slugExists) {
        slug = `${slug}-${Date.now()}`;
        console.log(`Generated unique slug to avoid conflicts: ${slug}`);
    }
    
    // Create empty content
    try {
        content = await Article.create({
            slug: slug,
            htmlContent: '',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(`Created empty content for article ${articleId}:`, content);
        return content;
    } catch (error) {
        console.error(`Error creating content for article ${articleId}:`, error);
        return null;
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        console.log('Fetching article content for ID:', params.id);
        await connectDB();
        
        // Try to find by slug first
        let article = await Article.findOne({ slug: params.id });
        console.log('Article lookup by slug result:', article ? 'found' : 'not found');
        
        // If not found, try to find using _id
        if (!article) {
            console.log('Article not found by slug, trying with _id');
            article = await Article.findById(params.id);
            console.log('Article lookup by _id result:', article ? 'found' : 'not found');
        }
        
        if (!article) {
            console.error('Article not found for ID:', params.id);
            return NextResponse.json(
                { error: 'Article not found', id: params.id },
                { status: 404 }
            );
        }
        
        console.log('Returning article:', article);
        return NextResponse.json(article);
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
        
        console.log('Updating article for ID:', params.id);
        console.log('Update data:', data);

        // Try to find and update by slug first
        let article = await Article.findOneAndUpdate(
            { slug: params.id },
            { ...data, updatedAt: new Date() },
            { new: true }
        );
        
        // If not found, try to update using _id
        if (!article) {
            console.log('Article not found by slug, trying with _id');
            article = await Article.findByIdAndUpdate(
                params.id,
                { ...data, updatedAt: new Date() },
                { new: true }
            );
        }

        if (!article) {
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

        if (!session?.user?.role || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const content = await Article.findOneAndDelete({ slug: params.id });

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