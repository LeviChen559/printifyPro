import { NextResponse } from "next/server";
import { PrismaClient, barcode_info } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: Request) {
  try {
    // Extract query parameters from the URL
    const url = new URL(req.url);
    const searchType = url.searchParams.get("searchType") || "";
    const searchValue = url.searchParams.get("searchValue") || "";
    // Prepare a filter object for Prisma
    const filter: { [key: string]: { contains: string } } =
      {};
    const searchableFields = [
      "product_name_en",
      "product_name_zh",
      "item_code",
    ];
    // If a valid column and search value are provided, add a WHERE clause
    if (searchableFields.includes(searchType) && searchValue) {
      filter[searchType] = {
        contains: searchValue,
      };
    }

    console.log("filter", filter);
    console.log("search", searchType, searchValue);

    // Fetch data from the barcode_info table using Prisma
    const labels: barcode_info[] = await prisma.barcode_info.findMany({
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
