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

    // Try fetching the ListeningTest
    let test;
    let skill: "LISTENING" = "LISTENING"; // Default to LISTENING

    // First, try to fetch a ListeningTest
    test = await prisma.listeningTest.findUnique({
      where: { id: testId },
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    // Extract correct answers from the ListeningTest
    let correctAnswers: (string | null)[] = [];
    if (skill === "LISTENING") {
      correctAnswers = test.sections.flatMap((section) =>
        section.questions.map((question) => question.correctAnswer)
      );
    }

    // Ensure user answers are in the same format
    const userAnswersArray = Object.keys(userAnswers).map(
      (questionId) => userAnswers[questionId]
    );

    if (userAnswersArray.length !== correctAnswers.length) {
      return NextResponse.json(
        { error: "Mismatch between user answers and correct answers" },
        { status: 400 }
      );
    }

    // Calculate score
    let correctCount = 0;
    userAnswersArray.forEach((answer, index) => {
      // Compare user answers with correct answers
      if (answer.toLowerCase() === correctAnswers[index]?.toLowerCase()) {
        correctCount++;
      }
    });

    // Map the correct count to the appropriate score based on the given scale
    let score = 0;
    if (correctCount < 11) score = 0;
    else if (correctCount >= 11 && correctCount <= 12) score = 4.0;
    else if (correctCount >= 13 && correctCount <= 15) score = 4.5;
    else if (correctCount >= 16 && correctCount <= 17) score = 5.0;
    else if (correctCount >= 18 && correctCount <= 22) score = 5.5;
    else if (correctCount >= 23 && correctCount <= 25) score = 6.0;
    else if (correctCount >= 26 && correctCount <= 29) score = 6.5;
    else if (correctCount >= 30 && correctCount <= 31) score = 7.0;
    else if (correctCount >= 32 && correctCount <= 34) score = 7.5;
    else if (correctCount >= 35 && correctCount <= 36) score = 8.0;
    else if (correctCount >= 37 && correctCount <= 38) score = 8.5;
    else if (correctCount >= 39 && correctCount <= 40) score = 9.0;

    // Save the test history to the database
    await prisma.testHistory.create({
      data: {
        userId,
        score: score, // Store the calculated score
        userAnswers: userAnswersArray, // Store answers as an array
        createdAt: new Date(),
        updatedAt: new Date(),
        listeningTestId: test.id, // Store the testId dynamically based on skill
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
