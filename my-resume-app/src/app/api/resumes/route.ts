import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { resumeTable } from "@/lib/db/schema";
import { auth } from '@clerk/nextjs/server';
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const user = await auth();
  
  if (!user.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();
  
  try {
    const result = await db.insert(resumeTable).values({
      clerkUserId: user.userId, // Use the correct column name
      fileUrl: data.fileUrl,
      positionTitle: data.positionTitle,
      company: data.company,
      keywords: data.keywords,
      points: 0, // Add default points
      // created_at and updated_at will be automatically set
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database error:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const authResult = await auth();
  const userId = authResult.userId;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const resumes = await db.select()
      .from(resumeTable)
      .where(eq(resumeTable.clerkUserId, userId));
    
    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Database error:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 