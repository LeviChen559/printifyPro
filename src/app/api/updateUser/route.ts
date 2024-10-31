import { createConnection } from "@/utils/db/db";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const db = await createConnection();
        if (!db) {
            throw new Error("Database connection failed");
        }

        // Parse the request body
        const { id, name, password, email } = await req.json();
        console.log("id:", id);
        console.log("name:", name);

        // Check if the user ID is provided
        if (!id) {
            return NextResponse.json(
                { success: false, error: "User ID is required" },
                { status: 400 } // 400 Bad Request
            );
        }

        // Prepare fields to update and query parameters dynamically
        const fieldsToUpdate: string[] = [];
        const queryParams: (string | undefined)[] = [];

        if (name) {
            fieldsToUpdate.push("name = ?");
            queryParams.push(name);
        }
        if (password) {
            fieldsToUpdate.push("password = ?");
            queryParams.push(password);
        }
        if (email) {
            fieldsToUpdate.push("email = ?");
            queryParams.push(email);
        }

        // Check if there are fields to update
        if (fieldsToUpdate.length === 0) {
            return NextResponse.json(
                { success: false, error: "No fields to update" },
                { status: 400 } // 400 Bad Request
            );
        }

        queryParams.push(id); // Add user ID as the last parameter

        // Build the final SQL query
        const sqlUpdate = `UPDATE AdminUsers SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

        // Execute the query
        const result = await db.query(sqlUpdate, queryParams);

        console.log("Update result:", result);
        const [updatedUserRows] = await db.query("SELECT * FROM AdminUsers WHERE id = ?", [id]);
        

        return NextResponse.json({ success: true, user: updatedUserRows }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 } // 500 Internal Server Error
        );
    }
}