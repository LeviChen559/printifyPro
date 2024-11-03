import { NextResponse } from "next/server";
import { PrismaClient, mylabels } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request body
    const data = await req.json();

    // Fetch data from the mylabels table using Prisma
    const newLabel: mylabels = await prisma.mylabels.create({
      data: {
        item_code: data.item_code,
        product_name_en: data.product_name_en,
        product_name_zh: data.product_name_zh,
        weight: data.weight,
        weight_unit: data.weight_unit,
        case_quantity: data.case_quantity,
        case_unit: data.case_unit,
        storage_requirements: data.storage_requirements,
        shelf_life: data.shelf_life,
        case_gtin: data.case_gtin,
        ingredient_info: data.ingredient_info,
      },
    });

    return NextResponse.json({ success: true, data: newLabel });
  } catch (error) {
    console.error("Error creating label:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
