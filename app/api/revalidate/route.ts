import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
  try {
    // Check authentication - only admins can trigger revalidation
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { path } = await request.json()
    const pathToRevalidate = path || '/'

    console.log('[API] Revalidate: Revalidating path:', pathToRevalidate)
    
    // Revalidate the specified path
    revalidatePath(pathToRevalidate)
    
    return NextResponse.json({ 
      message: `Path ${pathToRevalidate} revalidated successfully`,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('[API] Revalidate Error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
} 