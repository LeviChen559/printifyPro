import { users } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/utils/lib/prisma';

// 🔥 Prevent Next.js from statically caching this API
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch all users from the database
    const usersData: users[] = await prisma.users.findMany();
    console.log("Fetched users:", usersData);

    // Send the user data as JSON response with no caching
    return NextResponse.json(usersData, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error: unknown) {
    console.error("Database error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}