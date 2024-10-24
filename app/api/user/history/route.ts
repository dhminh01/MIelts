import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch the practice history for the specified user
    const history = await prisma.testHistory.findMany({
      where: {
        userId,
      },
      include: {
        test: true, // Include the related test information
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Failed to fetch practice history" },
      { status: 500 }
    );
  }
}
