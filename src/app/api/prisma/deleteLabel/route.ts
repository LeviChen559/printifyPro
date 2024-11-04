
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(req: NextRequest) {
    
    // Parse the request body
    try {
    const {id } = await req.json();
    
    // Check if the user ID is provided
    if (!id) {
        return NextResponse.json(
            { success: false, error: "Label ID is required" },
            { status: 400 } // 400 Bad Request
        );
    }
    const labelId = parseInt(id, 10);
    const existingLabel = await prisma.mylabels.findUnique({
        where: { id: labelId },
      });
      if (!existingLabel) {
        return NextResponse.json({ success: false, error: "Label not found" }, { status: 404 });
      }
 
        const deletedLabel = await prisma.mylabels.delete({
            where: { id: labelId },
          });
    
        return NextResponse.json({ success: true, data: deletedLabel }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 } // 500 Internal Server Error
        );
    }
}