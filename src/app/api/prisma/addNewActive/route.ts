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
    console.log("data",data)
   

    // Fetch data from the mylabels table using Prisma
    const newActivety: iActivities = await prisma.activities.create({
      data:{
        // id: lastActivity.id + 1,
        event: data.event,
        label_code: data.label_code,
        username: data.username,
        role: data.role,
        created_at: new Date()
      }});

    return NextResponse.json({ success: true, data: newActivety });
  } catch (error) {
    console.error("Error creating label:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
