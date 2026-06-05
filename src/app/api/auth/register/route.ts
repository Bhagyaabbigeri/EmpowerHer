import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if a user with this email already exists
    // 2. Hash the password
    // 3. Store the user in the database

    // Mock response - in a real app, this would be the newly created user from the database
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      // In a real app, you would never return the password
      // This is just for demonstration
      password: '********'
    };

    return NextResponse.json(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
