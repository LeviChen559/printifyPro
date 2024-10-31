
import { createConnection } from "@/utils/db/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const db = await createConnection();
        if (!db) {
            throw new Error("Database connection failed");
        }

        // Extract query parameters from the URL
        const url = new URL(req.url);
        const searchType = url.searchParams.get("searchType") || "";
        const searchValue = url.searchParams.get("searchValue") || "";

        // Base SQL query
        let sql = "SELECT * FROM barcode_info";
        const queryParams: string[] = [];

        // If a valid column and search value are provided, add a WHERE clause
        if (searchType && searchValue) {
            sql += ` WHERE ${searchType} LIKE ?`; // Safe parameterized query
            queryParams.push(`%${searchValue}%`); // Search using wildcard
        }

        const [Label] = await db.query(sql, queryParams);

        return NextResponse.json(Label);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Error fetching labels" });
    }
}