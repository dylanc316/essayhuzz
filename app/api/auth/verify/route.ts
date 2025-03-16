import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import Token from '@/models/Token';

export async function GET(request: NextRequest) {
  try {
    // Get token from query string
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Find token
    const verificationToken = await Token.findOne({
      token,
      type: 'verification'
    });
    
    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    
    // Update user's email verification status
    const user = await User.findById(verificationToken.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update user
    user.emailVerified = true;
    await user.save();
    
    // Delete used token
    await Token.deleteOne({ _id: verificationToken._id });
    
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}