export const dynamic = "force-dynamic"; // add this line at the top of the file
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import {prisma} from '@/utils/lib/prisma';

interface iActivities{
  id: number;
  event: string;
  label_code: string;
  username: string;
  role: string;
  created_at: Date | null;
}

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
          },
        })),
      }
    : {};

    // Fetch data from the mylabels table using Prisma
    const allActivities: iActivities[] = await prisma.activities.findMany({
      where: filter, // Apply filter to the query
    });
    const sortLabels = allActivities.sort((a, b) => b.id - a.id);
    console.log(sortLabels);
    return NextResponse.json(sortLabels);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
