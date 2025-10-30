export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/utils/lib/prisma';

export async function GET(request: NextRequest) {
  try {

    const id = request.nextUrl.searchParams.get("id");

    // Check if the id is provided and is a valid number
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or missing 'id' parameter",
        },
        { status: 400 }
      );
    }
    const labelId = Number(id);
    // Fetch data from the mylabels table using Prisma
    const labels = await prisma.labelstyle.findMany({
      where: { id: labelId }, // Convert id to number
    });
    
    if (labels.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: `No labels found with id: ${labelId}`,
        },
        { status: 200 } // Not found
      );
    }
    return NextResponse.json({ success: true, data: labels }, { status: 200 });
  } catch (error) {
    console.error("Error fetching labels:", error); // Log the error for debugging
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching labels",
      },
      { status: 500 } // Internal server error
    );
  }
}
