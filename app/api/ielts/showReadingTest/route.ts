import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const test = await prisma.readingTest.findUnique({
      where: { id },
      include: {
        passages: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (test) {
      return NextResponse.json({ test });
    } else {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching test:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
