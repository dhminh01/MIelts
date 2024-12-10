import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Sử dụng Prisma client của bạn

export async function GET() {
  try {
    const instructors = await prisma.instructor.findMany({
      select: {
        id: true,
        name: true,
        dob: true,
        phone: true,
        hometown: true,
        address: true,
        idCardImage: true, // Bao gồm đường dẫn/URL ảnh CMND
        certProof: true, // Bao gồm đường dẫn/URL chứng chỉ
      },
    });
    return NextResponse.json(instructors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch instructors" },
      { status: 500 }
    );
  }
}
