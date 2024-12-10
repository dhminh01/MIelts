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

    // Check if there's an existing request for this test history
    const existingRequest = await prisma.requestInfo.findFirst({
      where: { testHistoryId, userId },
    });

    // If a request exists and the status is "DECLINED", update the status to "PENDING"
    if (existingRequest && existingRequest.status === "DECLINED") {
      const updatedRequest = await prisma.requestInfo.update({
        where: { id: existingRequest.id },
        data: { status: "PENDING", instructorId }, // Update the status and instructorId if necessary
      });
      return NextResponse.json(updatedRequest, { status: 200 });
    }

    // If no request exists, create a new one with status "PENDING"
    const requestInfo = await prisma.requestInfo.create({
      data: {
        userId,
        testHistoryId,
        instructorId,
        status: "PENDING", // Default status is PENDING
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
