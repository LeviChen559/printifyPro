import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/lib/prisma";
import { users_role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { name, password, email, role } = await req.json();

    // Validate required fields
    if (!name || !password || !email || !role) {
      return NextResponse.json(
        { success: false, error: "Name, password, and email are required" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = await prisma.users.create({
      data: {
        name,
        password,
        email,
        role, // Add default role
        created_at: new Date(), // Add current timestamp
      },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Name, password, and email are required" },
        { status: 400 }
      );
    }

    // Create new user
    const deletedUser = await prisma.users.delete({
         where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, data: deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  // Parse the request body
  const { id, name, password, email, role } = await req.json();

  // Check if the user ID is provided
  if (!id) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 } // 400 Bad Request
    );
  }
  const userId = parseInt(id, 10);
  // Prepare fields to update and query parameters dynamically
  const fieldsToUpdate: {
    name?: string;
    password?: string;
    email?: string;
    role?: users_role;
  } = {};

  if (name) fieldsToUpdate.name = name;
  if (password) fieldsToUpdate.password = password;
  if (email) fieldsToUpdate.email = email;
  if (role) fieldsToUpdate.role = role;

  // Check if there are fields to update
  if (Object.keys(fieldsToUpdate).length === 0) {
    return NextResponse.json(
      { success: false, error: "No fields to update" },
      { status: 400 }
    );
  }
  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: fieldsToUpdate,
    });

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}