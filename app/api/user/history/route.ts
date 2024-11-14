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

    // Fetch the score history for the user, including testId and skill
    const history = await prisma.testHistory.findMany({
      where: { userId: "user-id" },
      include: {
        listeningTest: {
          select: { title: true },
        },
        readingTest: {
          select: { title: true },
        },
        writingTest: {
          select: { title: true },
        },
        speakingTest: {
          select: { title: true },
        },
      },
    });

    // Check if data exists
    if (history.length === 0) {
      return NextResponse.json(
        { message: "No history found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
