
import { NextResponse, NextRequest } from "next/server";

import {prisma} from '@/utils/lib/prisma';


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
 
      const deletedLabelStyle = await prisma.labelstyle.delete({
        where: { id: labelId },
      });
        const deletedLabel = await prisma.mylabels.delete({
            where: { id: labelId },
          });
    
        return NextResponse.json({ success: true, data: {deletedLabel,deletedLabelStyle} }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 } // 500 Internal Server Error
        );
    }
}