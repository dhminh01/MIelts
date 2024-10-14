// app/api/submit/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { practiceId, answers } = await req.json();

  try {
    // Fetch the correct answers from the database
    const practice = await prisma.listeningPractices.findUnique({
      where: { id: practiceId },
    });

    if (!practice) {
      return NextResponse.json(
        { message: "Practice not found" },
        { status: 404 }
      );
    }

    const correctAnswers = practice.correctAnswers;
    let score = 0;

    correctAnswers.forEach((correct: string, index: number) => {
      if (correct === answers[index]) {
        score++;
      }
    });

    // Assuming you have a way to get the user ID (like from a session, etc.)
    const userId = "someUserId"; // Replace this with actual user ID logic

    // Save the result in UserPracticeHistory
    await prisma.userPracticeHistory.create({
      data: {
        userId,
        practiceId,
        skill: "LISTENING",
        score,
        userAnswers: answers,
      },
    });

    return NextResponse.json({ score });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
