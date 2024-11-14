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

    // Try fetching each test model based on the testId
    let test;
    let skill: "LISTENING" | "READING" | "WRITING" | "SPEAKING" = "LISTENING"; // Default value

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
    if (test) {
      skill = "LISTENING";
    } else {
      // If not found, try to fetch a ReadingTest
      test = await prisma.readingTest.findUnique({
        where: { id: testId },
        include: {
          passages: {
            include: {
              questions: true,
            },
          },
        },
      });
      if (test) {
        skill = "READING";
      } else {
        // If not found, try to fetch a WritingTest
        test = await prisma.writingTest.findUnique({
          where: { id: testId },
          include: {
            questions: true, // Assuming WritingTest has questions like other tests
          },
        });
        if (test) {
          skill = "WRITING";
        } else {
          // If not found, try to fetch a SpeakingTest
          test = await prisma.speakingTest.findUnique({
            where: { id: testId },
            include: {
              questions: true,
            },
          });
          if (test) {
            skill = "SPEAKING";
          } else {
            // No test found for this testId
            return NextResponse.json(
              { error: "Test not found" },
              { status: 404 }
            );
          }
        }
      }
    }

    // Extract correct answers from the test
    let correctAnswers: string[] = [];
    if (skill === "LISTENING") {
      correctAnswers = test.sections.flatMap((section) =>
        section.questions.map((question) => question.correctAnswer)
      );
    } else if (skill === "READING") {
      correctAnswers = test.passages.flatMap((passage) =>
        passage.questions.map((question) => question.correctAnswer)
      );
    } 
    // else if (skill === "WRITING" || skill === "SPEAKING") {
    //   // Assuming WritingTest and SpeakingTest have a similar structure
    //   correctAnswers = test.questions.map((question) => question.correctAnswer);
    // }

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
    let score = 0;
    userAnswersArray.forEach((answer, index) => {
      // Compare user answers with correct answers
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
        score: normalizedScore, // Store the calculated score
        userAnswers: userAnswersArray, // Store answers as an array
        createdAt: new Date(),
        updatedAt: new Date(),
        [skill.toLowerCase() + "TestId"]: test.id, // Store the testId dynamically based on skill
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
