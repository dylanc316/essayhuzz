import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import Token from '@/models/Token';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      );
    }
    
    // Delete any existing tokens for this user
    await Token.deleteMany({
      userId: user._id,
      type: 'verification'
    });
    
    // Generate new token
    const verificationToken = await Token.create({
      userId: user._id,
      token: generateVerificationToken(),
      type: 'verification'
    });
    
    // Send verification email
    await sendVerificationEmail(
      email,
      verificationToken.token,
      user.name
    );
    
    return NextResponse.json({
      success: true,
      message: 'Verification email sent'
    });
    
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Failed to resend verification email' },
      { status: 500 }
    );
  }
}