import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would use a proper authentication library
// and connect to a database to verify credentials

// Mock user database
const USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password', // In a real app, passwords would be hashed
    name: 'Demo User',
    avatar: '/avatar-placeholder.png'
  },
  {
    id: '2',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Smith',
    avatar: null
  }
];

export async function POST(request: NextRequest) {
  try {
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
    const user = USERS.find(u => u.email === email);
    
    // Check if user exists and password is correct
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // In a real app, you would:
    // 1. Create a JWT token or session
    // 2. Set a secure HTTP-only cookie
    // 3. Return user info without sensitive data
    
    // For the demo, we'll just return user info
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar
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