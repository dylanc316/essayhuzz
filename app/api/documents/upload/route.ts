// app/api/documents/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/db';
import Document from '@/models/Document';
import { getUserFromToken } from '@/lib/tokens';

export async function POST(request: NextRequest) {
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
    
    // Get form data with file
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string || file.name;
    const type = formData.get('type') as string || 'book';
    const author = formData.get('author') as string || '';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }
    
    // In a production app, you would upload the file to S3/cloud storage
    // and get back a URL to store in the database
    
    // For this example, we'll just store the file metadata
    const document = await Document.create({
      userId: user.id,
      title: title,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: null, // Would be the S3/cloud URL in production
      isAnalyzed: false,
      type: type,
      author: author
    });
    
    return NextResponse.json({
      success: true,
      document: {
        id: document._id,
        title: document.title,
        fileName: document.fileName,
        fileSize: document.fileSize,
        type: document.type,
        author: document.author,
        createdAt: document.createdAt
      }
    });
    
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}