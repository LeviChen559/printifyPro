import { NextResponse } from "next/server";
import { activities } from "@prisma/client";

import { NextRequest } from "next/server";
import {prisma} from '@/utils/lib/prisma';




export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request body
    const data = await req.json();
    console.log("data",data)
   

    // Fetch data from the mylabels table using Prisma
    const newActivety: activities = await prisma.activities.create({
      data:{
        event: data.event,
        label_code: data.label_code,
        username: data.username,
        role: data.role,
        created_at: new Date()
      }});

    return NextResponse.json({ success: true, data: newActivety });
  } catch (error) {
    console.error("Error creating label_activety:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching labels",
    });
  }
}
