// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';
import { generateToken } from '../../../lib/tokens';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email, password } = body;
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    
    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json({
        success: false,
        needsVerification: true,
        email: user.email
      });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Set HTTP-only cookie with the token
    const cookieStore = cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });
    
    // Return user info without sensitive data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null,
      emailVerified: user.emailVerified
    };
    
    return NextResponse.json({ user: userResponse });
    
  } catch (error) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}