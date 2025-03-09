import { db } from '@/lib/db/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query, params } = await request.json();
    const result = await db.execute(query, params);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
} 