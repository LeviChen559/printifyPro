import { createConnection } from "@/utils/db/db";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const db = await createConnection();
    if (!db) {
      throw new Error("Database connection failed");
    }

    // Parse the request body
    const {
      customerId,
      firstName,
      lastName,
      email,
      phoneNumber,
      ticketId,
      ticketSet,
    } = await req.json();

    // Build the final SQL query
    const sqlInsert = `INSERT INTO customers (customerId, firstName, lastName, phoneNumber, email, ticketId, ticketSet)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query
    const result = await db.query(sqlInsert, [
      customerId,
      firstName,
      lastName,
      phoneNumber,
      email,
      ticketId,
      ticketSet,
    ]);

    console.log("Update result:", result);

    return NextResponse.json({ success: true, user: result }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
