import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Parse the query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validate the ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "A valid ID is required" },
        { status: 400 }
      );
    }

    // Fetch the Speaking test
    const test = await prisma.speakingTest.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    // Handle the case where the test is not found
    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    // Return the test data
    return NextResponse.json({ test });
  } catch (error) {
    console.error("Error fetching Speaking test:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
