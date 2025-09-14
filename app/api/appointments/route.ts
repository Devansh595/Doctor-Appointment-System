import { NextResponse } from 'next/server';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';

export async function GET() {
  try {
    const appointments = await getRecentAppointmentList();
    
    if (!appointments) {
      return NextResponse.json(
        {
          totalCount: 0,
          scheduledCount: 0,
          pendingCount: 0,
          cancelledCount: 0,
          documents: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      {
        totalCount: 0,
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
        documents: [],
        error: 'Failed to fetch appointments',
      },
      { status: 500 }
    );
  }
}
