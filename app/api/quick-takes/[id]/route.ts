import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuickTake from '@/models/QuickTake';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/quick-takes/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const quickTake = await QuickTake.findById(params.id);
    
    if (!quickTake) {
      return NextResponse.json(
        { error: 'Quick take not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(quickTake);
  } catch (error) {
    console.error('[API] Quick Take GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quick take' },
      { status: 500 }
    );
  }
}

// PUT /api/quick-takes/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    
    await connectDB();
    
    // Validate type if it's being updated
    if (data.type && !['text', 'chart', 'image', 'quote'].includes(data.type)) {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      );
    }

    const quickTake = await QuickTake.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!quickTake) {
      return NextResponse.json(
        { error: 'Quick take not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(quickTake);
  } catch (error) {
    console.error('[API] Quick Take PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update quick take' },
      { status: 500 }
    );
  }
}

// DELETE /api/quick-takes/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const quickTake = await QuickTake.findByIdAndDelete(params.id);
    
    if (!quickTake) {
      return NextResponse.json(
        { error: 'Quick take not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Quick Take DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete quick take' },
      { status: 500 }
    );
  }
} 