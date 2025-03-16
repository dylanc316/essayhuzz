// app/api/documents/[id]/analyses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Analysis from '@/models/Analysis';
import { getUserFromToken } from '@/lib/tokens';

// Fix the typing to use NextJS's standard params type
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Get auth token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify and get user from token
    const user = getUserFromToken(token);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Get analyses for this document and user
    const analyses = await Analysis.find({ 
      documentId: id,
      userId: user.id
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      analyses: analyses.map(analysis => ({
        id: analysis._id,
        documentId: analysis.documentId,
        type: analysis.type,
        title: analysis.title,
        content: analysis.content,
        createdAt: analysis.createdAt,
        updatedAt: analysis.updatedAt
      }))
    });
    
  } catch (error) {
    console.error('Get analyses error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analyses' },
      { status: 500 }
    );
  }
}