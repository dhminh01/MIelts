import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Đảm bảo bạn đã cấu hình Prisma
import { auth } from "@/auth";

// API route để lấy yêu cầu của INSTRUCTOR
export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user.id;

  // Kiểm tra xem người dùng có phải là INSTRUCTOR hay không
  if (!session || session.user.role !== "INSTRUCTOR") {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  // Lấy tất cả các yêu cầu mà instructorId khớp với instructorId trong RequestInfo
  const requests = await prisma.requestInfo.findMany({
    where: {
      instructorId: userId, // So sánh instructorId với id của giảng viên hiện tại
    },
  });

  return NextResponse.json(requests); // Trả về danh sách yêu cầu
}
