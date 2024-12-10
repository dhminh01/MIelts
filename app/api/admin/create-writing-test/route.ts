import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Prisma client

// POST handler for writing test creation
export async function POST(request: NextRequest) {
  const {
    title,
    task1Title,
    task2Title,
    task1_image, // Correct field name (task1_image)
    task2_image, // Correct field name (task2_image)
    task1_description,
    task2_description,
    task1_word_limit,
    task2_word_limit,
  } = await request.json(); // Directly parse the request body as JSON

  // Validate required fields
  if (
    !title ||
    !task1Title ||
    !task2Title ||
    !task1_description ||
    !task2_description
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const task1WordLimit = parseInt(task1_word_limit as string, 10);
  const task2WordLimit = parseInt(task2_word_limit as string, 10);

  // Ensure word limits are valid
  if (isNaN(task1WordLimit) || isNaN(task2WordLimit)) {
    return NextResponse.json(
      { error: "Invalid word limit values" },
      { status: 400 }
    );
  }

  // Use empty string if no image is provided
  const task1Image = task1_image || ""; // Correct field name for task1_image
  const task2Image = task2_image || ""; // Correct field name for task2_image

  try {
    // Create a new writing test entry in the database
    const newTest = await prisma.writingTest.create({
      data: {
        title,
        task1Title,
        task2Title,
        task1_description,
        task2_description,
        task1_imageURL: task1Image,
        task2_imageURL: task2Image,
        task1_word_limit: task1WordLimit,
        task2_word_limit: task2WordLimit,
      },
    });

    return NextResponse.json(newTest, { status: 200 });
  } catch (error) {
    console.error("Error creating writing test:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to create writing test" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
