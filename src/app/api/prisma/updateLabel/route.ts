
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PATCH(req: NextRequest) {
    
    // Parse the request body
    const { labelInfo, labelStyle } = await req.json();

    console.log("labelStyle",labelStyle)
    
    // Check if the user ID is provided
    if (!labelInfo) {
        return NextResponse.json(
          { success: false, error: "Label info is required" },
          { status: 400 }
        );
      }
      if (!labelStyle) {
        return NextResponse.json(
          { success: false, error: "Label style is required" },
          { status: 400 }
        );
      }

    const existingLabel = await prisma.mylabels.findUnique({
        where: { id: labelInfo.id },
      });
      if (!existingLabel) {
        return NextResponse.json({ success: false, error: "Label not found" }, { status: 404 });
      }
    // Prepare fields to update and query parameters dynamically
    const fieldsToUpdate = {
        ...(labelInfo.product_name_en && { product_name_en: labelInfo.product_name_en }),
        ...(labelInfo.product_name_zh && { product_name_zh: labelInfo.product_name_zh }),
        ...(labelInfo.weight && { weight: labelInfo.weight }),
        ...(labelInfo.weight_unit && { weight_unit: labelInfo.weight_unit }),
        ...(labelInfo.case_quantity && { case_quantity: labelInfo.case_quantity }),
        ...(labelInfo.storage_requirements && { storage_requirements: labelInfo.storage_requirements }),
        ...(labelInfo.shelf_life && { shelf_life: labelInfo.shelf_life }),
        ...(labelInfo.case_gtin && { case_gtin: labelInfo.case_gtin }),
        ...(labelInfo.ingredient_info && { ingredient_info: labelInfo.ingredient_info }),
      };
    
    
    // Check if there are fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
        return NextResponse.json(
            { success: false, error: "No fields to update" },
            { status: 400 }
        );
    }

    const styleFieldsToUpdate = {
        ...(labelStyle.product_name_en && { product_name_en: labelStyle.product_name_en }),
        ...(labelStyle.product_name_zh && { product_name_zh: labelStyle.product_name_zh }),
        // ...(labelStyle.weight && { weight: labelStyle.weight }),
        // ...(labelStyle.weight_unit && { weight_unit: labelStyle.weight_unit }),
        // ...(labelStyle.case_quantity && { case_quantity: labelStyle.case_quantity }),
        // ...(labelStyle.storage_requirements && { storage_requirements: labelStyle.storage_requirements }),
        // ...(labelStyle.shelf_life && { shelf_life: labelStyle.shelf_life }),
        // ...(labelStyle.case_gtin && { case_gtin: labelStyle.case_gtin }),
        // ...(labelStyle.ingredient_info && { ingredient_info: labelStyle.ingredient_info }),
      };
  
      // Check if there are fields to update in labelStyle
      if (Object.keys(styleFieldsToUpdate).length === 0) {
        return NextResponse.json(
          { success: false, error: "No valid fields to update in labelStyle" },
          { status: 400 }
        );
      }
    //   console.log("styleFieldsToUpdate",styleFieldsToUpdate)
    try {
        const updatedLabel = await prisma.mylabels.update({
            where: { id:labelInfo.id },
            data: fieldsToUpdate,
          });

          const updatedLabelStyle = await prisma.labelstyle.update({
            where: { id: labelInfo.id },  // Assuming labelStyle has a foreign key to the label
            data: styleFieldsToUpdate,
          });
    
    
        return NextResponse.json({ success: true, data: {updatedLabel,updatedLabelStyle} }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 } // 500 Internal Server Error
        );
    }
}