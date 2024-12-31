import { NextResponse } from "next/server";
import {  mylabels,labelstyle } from "@prisma/client";
import { NextRequest } from "next/server";
import prisma from '@/utils/lib/prisma';

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
        weight_unit: data.labelInput.weight_unit,
        case_quantity: data.labelInput.case_quantity,
        case_unit: data.labelInput.case_unit,
        storage_requirements: data.labelInput.storage_requirements,
        shelf_life: data.labelInput.shelf_life,
        case_gtin: data.labelInput.case_gtin,
        ingredient_info: data.labelInput.ingredient_info,
        manufactured_for: data.labelInput.manufactured_for,
        label_size: data.labelInput.label_size,
        logo: data.labelInput.logo
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
    console.log("error",error);
    console.error("Error creating label_label:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
