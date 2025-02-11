import { NextResponse } from "next/server";
import {  mylabels,labelstyle } from "@prisma/client";
import { NextRequest } from "next/server";
import {prisma} from '@/utils/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request body
    const data = await req.json();

    if (!data ) {
      console.log("Missing required data",data)



      return NextResponse.json({
        success: false,
        message: "Missing required data",
      }, { status: 400 });
    }
    // Fetch data from the mylabels table using Prisma
    const newLabel: mylabels = await prisma.mylabels.create({
      data: {
        id: data.labelInput.id,
        item_code: data.labelInput.item_code,
        product_name_en: data.labelInput.product_name_en,
        product_name_zh: data.labelInput.product_name_zh,
        weight: data.labelInput.weight,
        case_quantity: data.labelInput.case_quantity,
        case_unit: data.labelInput.case_unit,
        storage: data.labelInput.storage,
        shelf_life: data.labelInput.shelf_life,
        case_gtin: data.labelInput.case_gtin,
        ingredient: data.labelInput.ingredient,
        manufactured: data.labelInput.manufactured,
        label_temp: data.labelInput.label_temp,
        allergen: data.labelInput.allergen,
        logo: data.labelInput.logo,
        barcode: data.labelInput.barcode,
      },
    });
    const newLabelStyle:labelstyle = await prisma.labelstyle.create({
      data: {
        id: newLabel.id,
        item_code: data.defaultLabelStyle.item_code,
        product_name_en: data.defaultLabelStyle.product_name_en,
        product_name_zh: data.defaultLabelStyle.product_name_zh,
        weight: data.defaultLabelStyle.weight,
        case_quantity: data.defaultLabelStyle.case_quantity,
        case_unit: data.defaultLabelStyle.case_unit,
        storage: data.defaultLabelStyle.storage,
        best_before: data.defaultLabelStyle.shelf_life,
        ingredient: data.defaultLabelStyle.ingredient,
        manufactured: data.defaultLabelStyle.manufactured,
        allergen: data.defaultLabelStyle.allergen,
        lot_number: data.defaultLabelStyle.lot_number,
        shelf_life: data.defaultLabelStyle.shelf_life,
    }});
  

    return NextResponse.json({ success: true, data: {newLabel,newLabelStyle} });
  } catch (error) {
    console.log("error",error);
    console.error("Error creating label_label:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
