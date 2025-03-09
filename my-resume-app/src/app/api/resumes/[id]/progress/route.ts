import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { resumeTable, usersTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

const POINTS_MAP = {
  applied: 10,
  phone_screen: 20,
  technical_test: 30,
  interview_1: 50,
  interview_2: 70,
  offer_received: 100,
  hired: 150
};

type ProgressStage = keyof typeof POINTS_MAP;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { progress } = await request.json() as { progress: ProgressStage };
    const points = POINTS_MAP[progress] || 0;
    
    // Update resume points
    const resume = await db.update(resumeTable)
      .set({ progress, points })
      .where(eq(resumeTable.id, Number(params.id)));
    
    // Get user ID from resume
    const user = await db.select({ clerkUserId: resumeTable.clerkUserId })
      .from(resumeTable)
      .where(eq(resumeTable.id, Number(params.id)))
      .then(res => res[0]);
    
    // Update user total points
    await db.update(usersTable)
      .set({ totalPoints: sql`${usersTable.totalPoints} + ${points}` })
      .where(eq(usersTable.clerkUserId, user.clerkUserId));
      
    return NextResponse.json(resume);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
} 