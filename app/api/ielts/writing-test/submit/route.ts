import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure correct path for prisma

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Extract data from the request body
    const { userId, writingTestId, task1Answer, task2Answer } = body;

    // Validate required fields
    if (!userId || !writingTestId || (!task1Answer && !task2Answer)) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Save the user's answers and create a TestHistory entry
    const testHistory = await prisma.testHistory.create({
      data: {
        userId,
        writingTestId,
        userAnswers: {
          task1: task1Answer || null,
          task2: task2Answer || null,
        },
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Answers submitted successfully.",
        testHistory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting Writing Test answers:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting answers." },
      { status: 500 }
    );
  }
}
