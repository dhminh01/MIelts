import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(request: Request) {
  const { id } = await request.json(); // Lấy ID bài thi từ body của request

  try {
    const deletedTest = await db.test.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Test successfully deleted!", deletedTest },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete test." },
      { status: 500 }
    );
  }
}
