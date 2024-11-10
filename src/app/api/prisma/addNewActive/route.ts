import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";


interface iActivities{
  id: number;
  event: string;
  label_code: string;
  username: string;
  role: string;
  created_at: Date | null;
}
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request body
    const data = await req.json();

    // Fetch data from the mylabels table using Prisma
    const newActivety: iActivities = await prisma.activities.create({
      data: {
        event: data.event,
        username: data.username,
        created_at: new Date(),
        role: data.role,
        label_code: data.label_code,
      
      },
    });

    return NextResponse.json({ success: true, data: newActivety });
  } catch (error) {
    console.error("Error creating label:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
