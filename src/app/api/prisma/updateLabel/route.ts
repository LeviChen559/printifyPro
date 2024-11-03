
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PATCH(req: NextRequest) {
    
    // Parse the request body
    const {id, product_name_en, product_name_zh,weight,weight_unit,case_quantity,storage_requirements,shelf_life,case_gtin,ingredient_info } = await req.json();
    
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
    // Prepare fields to update and query parameters dynamically
    const fieldsToUpdate = {
        ...(product_name_en && { product_name_en }),
        ...(product_name_zh && { product_name_zh }),
        ...(weight && { weight }),
        ...(weight_unit && { weight_unit }),
        ...(case_quantity && { case_quantity }),
        ...(storage_requirements && { storage_requirements }),
        ...(shelf_life && { shelf_life }),
        ...(case_gtin && { case_gtin }),
        ...(ingredient_info && { ingredient_info }),
      };
    
    
    // Check if there are fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
        return NextResponse.json(
            { success: false, error: "No fields to update" },
            { status: 400 }
        );
    }
    try {
        const updatedLabel = await prisma.mylabels.update({
            where: { id:labelId },
            data: fieldsToUpdate,
          });
    
    
        return NextResponse.json({ success: true, data: updatedLabel }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 } // 500 Internal Server Error
        );
    }
}