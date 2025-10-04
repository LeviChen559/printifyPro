// app/api/keepalive/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Multiple queries to ensure database activity
    await prisma.$queryRaw`SELECT 1`;
    
    // Count users to make a meaningful query
    const userCount = await prisma.users.count();

    return NextResponse.json({ 
      status: "alive", 
      timestamp: new Date().toISOString(),
      userCount,
      message: "Database connection active"
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Keep-alive error:", errorMessage);
    return NextResponse.json({ 
      status: "error", 
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    // Disconnect Prisma to prevent connection pooling issues
    await prisma.$disconnect();
  }
}