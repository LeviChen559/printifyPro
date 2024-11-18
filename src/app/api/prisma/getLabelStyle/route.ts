import { NextResponse } from "next/server";
import prisma from '@/utils/lib/prisma';

export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

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

    // Fetch data from the mylabels table using Prisma
    const labels = await prisma.labelstyle.findMany({
      where: { id: Number(id) }, // Convert id to number
    });
    

    return NextResponse.json({ success: true, data: labels }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
