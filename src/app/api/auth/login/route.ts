import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // In a real application, you would validate the credentials against your database
    // This is a simplified example
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock user data - in a real app, this would come from your database
    // and you would verify the password hash
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: email,
      // In a real app, never store plain text passwords
      // This is just for demonstration
      password: 'password123'
    };

    if (email !== mockUser.email || password !== mockUser.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // In a real app, you would generate a JWT token here
    // and return it to the client
    const userData = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email
    };

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
