import { createConnection } from "@/utils/db/db";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const db = await createConnection();
        if (!db) {
            throw new Error("Database connection failed");
        }
        const sql = "SELECT * FROM users";
        const [User] = await db.query(sql);
        return NextResponse.json(User);

    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }

}