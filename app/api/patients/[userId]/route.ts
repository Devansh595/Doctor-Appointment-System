import { NextResponse } from 'next/server';
import { getPatient } from '@/lib/actions/patient.actions';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const patient = await getPatient(params.userId);
    
    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}
