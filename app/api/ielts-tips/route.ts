// app/api/ielts-tips/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Đảm bảo bạn đã cấu hình prisma đúng

export async function GET() {
  try {
    const tips = await prisma.ieltsTips.findMany({
      orderBy: { skill: "asc" }, // Sắp xếp theo kỹ năng (nếu cần)
    });

    return NextResponse.json(tips);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tips." },
      { status: 500 }
    );
  }
}
