import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const tests = await db.test.findMany(); // Lấy danh sách bài thi từ cơ sở dữ liệu
    return NextResponse.json({ tests });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch tests." },
      { status: 500 }
    );
  }
}
