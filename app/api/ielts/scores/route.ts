import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function GET(request: Request) {
  try {
    // Retrieve the authenticated user
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch the score history for the user
    const history = await prisma.testHistory.findMany({
      where: { userId },
      select: {
        createdAt: true,
        score: true,
        skill: true, // Assuming skill is part of the model
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
