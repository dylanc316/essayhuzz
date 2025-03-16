// app/api/documents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Document from '@/models/Document';
import { getUserFromToken } from '@/lib/tokens';

export async function GET(request: NextRequest) {
  try {
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
    
    // Get pagination parameters from query string
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Get documents for this user
    const documents = await Document.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const totalCount = await Document.countDocuments({ userId: user.id });
    
    return NextResponse.json({
      success: true,
      documents: documents.map(doc => ({
        id: doc._id,
        title: doc.title,
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        type: doc.type,
        author: doc.author,
        isAnalyzed: doc.isAnalyzed,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
    
  } catch (error) {
    console.error('Get documents error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve documents' },
      { status: 500 }
    );
  }
}