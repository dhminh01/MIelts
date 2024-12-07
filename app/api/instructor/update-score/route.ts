import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { testHistoryId, score } = await request.json();

    if (!testHistoryId || score === undefined) {
      return NextResponse.json(
        { error: "testHistoryId and score are required." },
        { status: 400 }
      );
    }

    // Find the TestHistory record by testHistoryId
    const testHistory = await prisma.testHistory.findUnique({
      where: { id: testHistoryId },
    });

    if (!testHistory) {
      return NextResponse.json(
        { error: "TestHistory not found." },
        { status: 404 }
      );
    }

    // Update the score in TestHistory
    const updatedTestHistory = await prisma.testHistory.update({
      where: { id: testHistoryId },
      data: { score },
    });

    return NextResponse.json(updatedTestHistory);
  } catch (error) {
    console.error("Error updating score:", error);
    return NextResponse.json(
      { error: "Failed to update the score." },
      { status: 500 }
    );
  }
}
