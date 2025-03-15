import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Create user in database
    
    // For demo purposes, just simulate a successful registration
    const newUser = {
      id: '123',
      name: `${firstName} ${lastName}`,
      email: email,
      // Don't include password in the response
    };
    
    return NextResponse.json({ 
      user: newUser,
      message: 'Registration successful' 
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}