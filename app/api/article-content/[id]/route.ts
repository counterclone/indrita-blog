import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import ArticleContent from '@/models/ArticleContent';
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
    let content = await ArticleContent.findOne({ articleId });
    
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
    const slugExists = await ArticleContent.findOne({ slug });
    if (slugExists) {
        slug = `${slug}-${Date.now()}`;
        console.log(`Generated unique slug to avoid conflicts: ${slug}`);
    }
    
    // Create empty content
    try {
        content = await ArticleContent.create({
            articleId: articleId,
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
        
        // First try to find by articleId
        let content = await ArticleContent.findOne({ articleId: params.id });
        console.log('Content lookup by articleId result:', content ? 'found' : 'not found');
        
        // If not found, try to find using _id
        if (!content) {
            console.log('Content not found by articleId, trying with _id');
            content = await ArticleContent.findOne({ _id: params.id });
            console.log('Content lookup by _id result:', content ? 'found' : 'not found');
        }
        
        // If still not found, try to ensure content exists
        if (!content) {
            console.log('Content not found by either method, attempting to create it');
            content = await ensureArticleContent(params.id);
            
            if (!content) {
                console.error('Failed to create content for article ID:', params.id);
                return NextResponse.json(
                    { error: 'Article content not found and could not be created', id: params.id },
                    { status: 404 }
                );
            }
            
            console.log('Successfully created new content for article ID:', params.id);
        }
        
        console.log('Returning article content:', content);
        return NextResponse.json(content);
    } catch (error: any) {
        console.error('Error fetching article content:', error);
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
        
        console.log('Updating article content for ID:', params.id);
        console.log('Update data:', data);

        // First try to find by articleId
        let content = await ArticleContent.findOneAndUpdate(
            { articleId: params.id },
            { ...data, updatedAt: new Date() },
            { new: true }
        );
        
        // If not found, try to update using _id
        if (!content) {
            console.log('Content not found by articleId, trying with _id');
            content = await ArticleContent.findOneAndUpdate(
                { _id: params.id },
                { ...data, updatedAt: new Date() },
                { new: true }
            );
        }

        // If still not found, create new content
        if (!content) {
            console.log('Content not found for update, creating new content');
            
            // Ensure we have required fields
            if (!data.articleId || !data.slug || !data.htmlContent) {
                return NextResponse.json(
                    { error: 'Article ID, slug, and HTML content are required for new content' },
                    { status: 400 }
                );
            }
            
            // Create new content
            content = await ArticleContent.create({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            console.log('Created new article content:', content);
            return NextResponse.json(content);
        }

        console.log('Updated article content:', content);
        return NextResponse.json(content);
    } catch (error: any) {
        console.error('Error updating article content:', error);
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