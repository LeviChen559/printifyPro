export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import {  mylabels } from "@prisma/client";
import {prisma} from '@/utils/lib/prisma';

export async function GET(req: NextRequest) {
  try {
  const searchValue = req.nextUrl.searchParams.get("searchValue") || "";
  
    const searchableFields = [
      "product_name_en",
      "product_name_zh",
      "item_code",
      "case_gtin",
      "ingredient"
    ];
    // If a valid column and search value are provided, add a WHERE clause
    const filter = searchValue
      ? {
          OR: searchableFields.map((field) => ({
            [field]: {
              contains: searchValue,
              mode: "insensitive",  // Case-insensitive search
            },
          })),
        }
      : {};  // If no searchValue, don't apply any filter

    console.log("filter", filter);

    // Fetch data from the mylabels table using Prisma
    const labels: mylabels[] = await prisma.mylabels.findMany({
      where: filter, // Apply filter to the query
    });
    const sortLabels = labels.sort((a, b) => b.id - a.id);

    return NextResponse.json(sortLabels);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
