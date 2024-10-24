// /api/ielts/submit/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const { testId, userAnswers } = await request.json();

  console.log("User Answers:", userAnswers); // Log userAnswers for debugging

  try {
    // Retrieve the authenticated user
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch the correct answers for the test
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        sections: {
          include: {
            questions: true, // Include the questions to get their correct answers
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const correctAnswers = test.sections.flatMap((section) =>
      section.questions.map((question) => question.correctAnswer)
    );

    // Convert userAnswers object to an array to check answers
    const userAnswersArray = Object.values(userAnswers);

    if (!Array.isArray(userAnswersArray)) {
      return NextResponse.json(
        { error: "Invalid user answers format" },
        { status: 400 }
      );
    }

    // Calculate score
    let score = 0;
    userAnswersArray.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });

    // Normalize score to a scale of 9
    const normalizedScore = (score / correctAnswers.length) * 9;

    // Save the test history to the database
    await prisma.testHistory.create({
      data: {
        userId,
        testId,
        userAnswers: userAnswersArray, // Store answers as an array
        createdAt: new Date(),
        score: normalizedScore, // Store the calculated score
      },
    });

    return NextResponse.json({ message: "Test submitted successfully!" });
  } catch (error) {
    console.error("Error saving test history:", error);
    return NextResponse.json(
      { error: "Failed to save test history" },
      { status: 500 }
    );
  }
}
