import { PrismaClient, users } from '@prisma/client';
import {  NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all users from the database
    const users: users[] = await prisma.users.findMany(); // Make sure you use the correct model name
    console.log("users", users);

    // Send the user data as JSON response
    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}