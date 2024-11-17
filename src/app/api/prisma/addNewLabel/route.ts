import { NextResponse } from "next/server";
import { PrismaClient, mylabels,labelstyle } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request body
    const data = await req.json();

    // Fetch data from the mylabels table using Prisma
    const newLabel: mylabels = await prisma.mylabels.create({
      data: {
        id: data.lableInput.id,
        item_code: data.lableInput.item_code,
        product_name_en: data.lableInput.product_name_en,
        product_name_zh: data.lableInput.product_name_zh,
        weight: data.lableInput.weight,
        weight_unit: data.lableInput.weight_unit,
        case_quantity: data.lableInput.case_quantity,
        case_unit: data.lableInput.case_unit,
        storage_requirements: data.lableInput.storage_requirements,
        shelf_life: data.lableInput.shelf_life,
        case_gtin: data.lableInput.case_gtin,
        ingredient_info: data.lableInput.ingredient_info,
        manufactured_for: data.lableInput.manufactured_for,
      },
    });
    const newLabelStyle:labelstyle = await prisma.labelstyle.create({
      data: {
        id: data.defaultLabelStyle.id,
        item_code: data.defaultLabelStyle.item_code,
        product_name_en: data.defaultLabelStyle.product_name_en,
        product_name_zh: data.defaultLabelStyle.product_name_zh,
        weight: data.defaultLabelStyle.weight,
        weight_unit: data.defaultLabelStyle.weight_unit,
        case_quantity: data.defaultLabelStyle.case_quantity,
        case_unit: data.defaultLabelStyle.case_unit,
        storage_requirements: data.defaultLabelStyle.storage_requirements,
        best_before: data.defaultLabelStyle.shelf_life,
        ingredient_info: data.defaultLabelStyle.ingredient_info,
        manufactured_for: data.defaultLabelStyle.manufactured_for,
    }});

    return NextResponse.json({ success: true, data: {newLabel,newLabelStyle} });
  } catch (error) {
    console.error("Error creating label:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
