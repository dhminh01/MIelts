import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("ID", id);

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const test = await prisma.test.findUnique({
      where: {
        id: id,
      },
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ test });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching test" },
      { status: 500 }
    );
  }
}
