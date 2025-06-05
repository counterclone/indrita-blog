import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuickTake from '@/models/QuickTake';

// POST /api/quick-takes/[id]/like
export async function POST(
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
    
    // Toggle like (increment or decrement)
    const { action } = await request.json();
    const updateOperation = action === 'like' ? { $inc: { likes: 1 } } : { $inc: { likes: -1 } };
    
    const updatedQuickTake = await QuickTake.findByIdAndUpdate(
      params.id,
      updateOperation,
      { new: true }
    );
    
    return NextResponse.json(updatedQuickTake);
  } catch (error) {
    console.error('[API] Quick Take Like Error:', error);
    return NextResponse.json(
      { error: 'Failed to update like status' },
      { status: 500 }
    );
  }
} 