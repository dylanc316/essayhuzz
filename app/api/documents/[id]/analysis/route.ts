// app/api/documents/[id]/analysis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Analysis from '@/models/Analysis';
import { getUserFromToken } from '@/lib/tokens';

// Using NextRequest.nextUrl.pathname to extract the ID parameter
export async function GET(request: NextRequest) {
  try {
    // Extract ID from the URL path
    const pathname = request.nextUrl.pathname;
    const idMatch = pathname.match(/\/api\/documents\/([^\/]+)\/analysis/);
    const id = idMatch ? idMatch[1] : null;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Invalid document ID' },
        { status: 400 }
      );
    }
    
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