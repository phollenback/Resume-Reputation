import { db } from '@/lib/db/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { endpoint: string } }) {
  try {
    const body = await request.json();
    const result = await db.query(params.endpoint, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
} 