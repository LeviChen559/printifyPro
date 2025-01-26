
import { NextResponse, NextRequest } from "next/server";
import prisma from '@/utils/lib/prisma';

export async function PATCH(req: NextRequest) {
    
    // Parse the request body
    const { labelInfo, labelStyle } = await req.json();

    
    console.log("labelInfo",labelInfo)
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
        ...(labelInfo.case_quantity && { case_quantity: labelInfo.case_quantity }),
        ...(labelInfo.storage && { storage: labelInfo.storage }),
        ...(labelInfo.shelf_life && { shelf_life: labelInfo.shelf_life }),
        ...(labelInfo.case_gtin && { case_gtin: labelInfo.case_gtin }),
        ...(labelInfo.ingredient && { ingredient: labelInfo.ingredient }),
        ...(labelInfo.label_temp && { label_temp: labelInfo.label_temp }),
        ...(labelInfo.logo && { logo: labelInfo.logo }),
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
        ...(labelStyle.ingredient && { ingredient: labelStyle.ingredient }),
        ...(labelStyle.allergen && { allergen: labelStyle.allergen }),
        ...(labelStyle.manufactured && { manufactured: labelStyle.manufactured }),

      };
  
      // Check if there are fields to update in labelStyle
      if (Object.keys(styleFieldsToUpdate).length === 0) {
        return NextResponse.json(
          { success: false, error: "No valid fields to update in labelStyle" },
          { status: 400 }
        );
      }
      console.log("styleFieldsToUpdate",styleFieldsToUpdate)
    try {
        const updatedLabel = await prisma.mylabels.update({
            where: { id:labelInfo.id },
            data: fieldsToUpdate,
          });
           // Log result to confirm success


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