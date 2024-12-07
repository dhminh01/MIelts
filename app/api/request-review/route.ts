// API route for creating a request to review a writing test
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Adjust this path based on your project structure
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user.id;

  try {
    const body = await request.json();
    const { testHistoryId, instructorId } = body;

    // Ensure user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Ensure testHistoryId and instructorId are provided
    if (!testHistoryId || !instructorId) {
      return NextResponse.json(
        { error: "testHistoryId and instructorId are required" },
        { status: 400 }
      );
    }

    // Create the requestInfo record
    const requestInfo = await prisma.requestInfo.create({
      data: {
        userId,
        testHistoryId,
        instructorId, // Add instructorId to the requestInfo
        status: "PENDING",
      },
    });

    return NextResponse.json(requestInfo, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
