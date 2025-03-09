import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = await db
      .select({
        clerkUserId: usersTable.clerkUserId,
        totalPoints: usersTable.totalPoints
      })
      .from(usersTable)
      .orderBy(desc(usersTable.totalPoints))
      .limit(10);

    return NextResponse.json(leaderboard || []);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json([], { status: 500 });
  }
} 