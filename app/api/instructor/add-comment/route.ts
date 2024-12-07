import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Import Prisma client

// API route to add a comment for a specific TestHistory
export async function POST(req: NextRequest) {
  try {
    const { testHistoryId, comment, instructorId, instructorEmail } =
      await req.json(); // Get data from the request body

    if (!testHistoryId || !comment || !instructorId || !instructorEmail) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find the instructor by ID
    const instructor = await prisma.user.findUnique({
      where: { id: instructorId },
    });

    if (!instructor) {
      return NextResponse.json(
        { message: "Instructor not found" },
        { status: 404 }
      );
    }

    // Create the comment and save it in the database
    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        authorName: instructor.name,
        authorEmail: instructorEmail,
        testHistoryId: testHistoryId, // Associate the comment with the TestHistory
      },
    });

    // Respond with the new comment
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
