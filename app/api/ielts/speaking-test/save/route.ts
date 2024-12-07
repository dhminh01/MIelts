import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const { testId, audioURL } = await request.json();

  // Log the request body for debugging (can be removed in production)
  console.log("Received request body:", { testId, audioURL });

  try {
    // Check if testId and audioURL are provided
    if (!testId || !audioURL) {
      return NextResponse.json(
        { error: "testId and audioURL are required" },
        { status: 400 }
      );
    }

    // Retrieve the authenticated user
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Ensure the testId is valid (checking for a string or a valid MongoDB ObjectId)
    if (typeof testId !== "string" || testId.length !== 24) {
      return NextResponse.json(
        { error: "Invalid testId format" },
        { status: 400 }
      );
    }

    // Retrieve the speaking test based on the testId
    const test = await prisma.speakingTest.findUnique({
      where: { id: testId },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    // Create a new TestHistory record for the speaking test
    await prisma.testHistory.create({
      data: {
        userId, // Directly use the valid userId string (no need to convert to ObjectId)
        speakingTestId: test.id, // Store the speaking test id
        audioURL, // Store the audio URL submitted by the user
      },
    });

    return NextResponse.json({ message: "Test submitted successfully!" });
  } catch (error) {
    console.error("Error saving test history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
