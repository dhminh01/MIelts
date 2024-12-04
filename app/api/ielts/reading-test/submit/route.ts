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

    // Try fetching a ReadingTest
    let test = await prisma.readingTest.findUnique({
      where: { id: testId },
      include: {
        passages: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    // Extract correct answers from the test
    const correctAnswers = test.passages.flatMap((passage) =>
      passage.questions.map((question) => question.correctAnswer)
    );

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

    // Calculate score based on the number of correct answers
    let correctCount = 0;
    userAnswersArray.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    // Calculate score based on predefined score brackets
    let score = 0;
    if (correctCount < 6) score = 0;
    else if (correctCount >= 6 && correctCount <= 7) score = 3.0;
    else if (correctCount >= 8 && correctCount <= 10) score = 3.5;
    else if (correctCount >= 11 && correctCount <= 12) score = 4.0;
    else if (correctCount >= 13 && correctCount <= 14) score = 4.5;
    else if (correctCount >= 15 && correctCount <= 18) score = 5.0;
    else if (correctCount >= 19 && correctCount <= 22) score = 5.5;
    else if (correctCount >= 23 && correctCount <= 26) score = 6.0;
    else if (correctCount >= 27 && correctCount <= 29) score = 6.5;
    else if (correctCount >= 30 && correctCount <= 32) score = 7.0;
    else if (correctCount >= 33 && correctCount <= 34) score = 7.5;
    else if (correctCount >= 35 && correctCount <= 36) score = 8.0;
    else if (correctCount >= 37 && correctCount <= 38) score = 8.5;
    else if (correctCount >= 39 && correctCount <= 40) score = 9.0;

    // Save the test history to the database
    await prisma.testHistory.create({
      data: {
        userId,
        score, // Store the calculated score
        userAnswers: userAnswersArray, // Store answers as an array
        createdAt: new Date(),
        updatedAt: new Date(),
        readingTestId: test.id, // Store the testId for the ReadingTest
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
