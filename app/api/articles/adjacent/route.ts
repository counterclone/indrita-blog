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
    
    // Get previous article (older)
    const previousArticle = await Article.findOne({
      date: { $lt: currentDate }
    })
      .select('title slug _id')
      .sort({ date: -1 })
      .lean()
      .exec();
    
    // Get next article (newer)  
    const nextArticle = await Article.findOne({
      date: { $gt: currentDate }
    })
      .select('title slug _id')
      .sort({ date: 1 })
      .lean()
      .exec();
    
    const response = {
      previousArticle: previousArticle ? {
        title: (previousArticle as any).title,
        slug: (previousArticle as any).slug,
        _id: (previousArticle as any)._id.toString()
      } : null,
      nextArticle: nextArticle ? {
        title: (nextArticle as any).title,
        slug: (nextArticle as any).slug,
        _id: (nextArticle as any)._id.toString()
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