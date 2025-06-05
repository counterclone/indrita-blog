import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuickTake from '@/models/QuickTake';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/quick-takes
export async function GET() {
  try {
    await connectDB();
    
    const quickTakes = await QuickTake.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(quickTakes);
  } catch (error) {
    console.error('[API] Quick Takes GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quick takes' },
      { status: 500 }
    );
  }
}

// POST /api/quick-takes
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.type || !data.content) {
      return NextResponse.json(
        { error: 'Type and content are required' },
        { status: 400 }
      );
    }

    // Validate type enum
    if (!['text', 'chart', 'image', 'quote'].includes(data.type)) {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      );
    }

    await connectDB();
    
    const quickTake = await QuickTake.create(data);
    
    return NextResponse.json(quickTake, { status: 201 });
  } catch (error) {
    console.error('[API] Quick Takes POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create quick take' },
      { status: 500 }
    );
  }
} 