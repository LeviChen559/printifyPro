// app/api/keepalive/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Minimal query to keep DB connection alive
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({ status: "alive", timestamp: new Date().toISOString() });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ status: "error", error: errorMessage }, { status: 500 });
  } finally {
    // Optional: disconnect Prisma if you don't want long-lived connections
    // await prisma.$disconnect();
  }
}