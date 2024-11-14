// /app/api/getUserScoreHistory/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const history = await prisma.testHistory.findMany({
      where: { userId },
      select: {
        listeningTestId: true,
        readingTestId: true,
        writingTestId: true,
        speakingTestId: true,
        score: true,
        userAnswers: true,
        createdAt: true,
      },
    });

    const transformedHistory = {
      listening: history
        .filter((h) => h.listeningTestId)
        .map((h) => ({
          date: h.createdAt,
          score: h.score,
        })),
      reading: history
        .filter((h) => h.readingTestId)
        .map((h) => ({
          date: h.createdAt,
          score: h.score,
        })),
      writing: history
        .filter((h) => h.writingTestId)
        .map((h) => ({
          date: h.createdAt,
          score: h.score,
        })),
      speaking: history
        .filter((h) => h.speakingTestId)
        .map((h) => ({
          date: h.createdAt,
          score: h.score,
        })),
    };

    return NextResponse.json(transformedHistory);
  } catch (error) {
    console.error("Error fetching user score history:", error);
    return NextResponse.json(
      { error: "Failed to fetch score history" },
      { status: 500 }
    );
  }
}
