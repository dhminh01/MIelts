import { NextResponse } from "next/server";
import prisma from "@/lib/db"; 

export async function GET(request: Request) {
  // Lấy query từ URL
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.toLowerCase() || "";

  // Nếu không có tiêu đề để tìm kiếm, trả về một danh sách rỗng
  if (!title) {
    return NextResponse.json({ tests: [] });
  }

  try {
    // Tìm kiếm các bài luyện thi có tiêu đề khớp
    const tests = await prisma.test.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive", // Tìm kiếm không phân biệt hoa thường
        },
      },
      select: {
        id: true,
        title: true,
        skill: true,
      },
    });

    return NextResponse.json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json(
      { error: "Failed to fetch tests" },
      { status: 500 }
    );
  }
}
