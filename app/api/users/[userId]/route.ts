import { NextResponse } from 'next/server';
import { getUser } from '@/lib/actions/patient.actions';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await getUser(params.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
