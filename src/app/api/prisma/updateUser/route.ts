
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PATCH(req: NextRequest) {
    
    
    // Parse the request body
    const { id, name, password, email } = await req.json();
    
    // Check if the user ID is provided
    if (!id) {
        return NextResponse.json(
            { success: false, error: "User ID is required" },
            { status: 400 } // 400 Bad Request
        );
    }
    const userId = parseInt(id, 10);
    // Prepare fields to update and query parameters dynamically
    const fieldsToUpdate: { name?: string; password?: string; email?: string } = {};
    
    if (name) fieldsToUpdate.name = name;
    if (password) fieldsToUpdate.password = password;
    if (email) fieldsToUpdate.email = email;
    
    // Check if there are fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
        return NextResponse.json(
            { success: false, error: "No fields to update" },
            { status: 400 }
        );
    }
    try {
        const updatedUser = await prisma.users.update({
            where: { id:userId },
            data: fieldsToUpdate,
          });
    
    
        return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 } // 500 Internal Server Error
        );
    }
}