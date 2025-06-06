import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    
    if (!dateParam) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    await connectDB();
    
    const currentDate = new Date(dateParam);
    
    // Get all articles first to understand the ordering
    const allArticles = await Article.find()
      .select('title slug _id date')
      .sort({ date: -1 })
      .lean()
      .exec();
    
    // Find current article index
    const currentIndex = allArticles.findIndex(article => 
      Math.abs(new Date(article.date).getTime() - currentDate.getTime()) < 1000 // within 1 second
    );
    
    // Get previous article (newer in chronological order, but appears before in our desc sorted list)
    const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
    
    // Get next article (older in chronological order, but appears after in our desc sorted list)  
    const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
    
    const response = {
      previousArticle: previousArticle ? {
        title: previousArticle.title as string,
        slug: previousArticle.slug as string,
        _id: (previousArticle._id as any).toString()
      } : null,
      nextArticle: nextArticle ? {
        title: nextArticle.title as string,
        slug: nextArticle.slug as string,
        _id: (nextArticle._id as any).toString()
      } : null
    };
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600', // 30 min cache
      }
    });
    
  } catch (error: any) {
    console.error('Error fetching adjacent articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adjacent articles', details: error.message },
      { status: 500 }
    );
  }
} 