import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ReadingTestSchema } from "@/schemas";


export async function POST(request: Request) {
  try {
    const formData = await request.json(); // Parse the request body directly as JSON

    const validatedData = ReadingTestSchema.parse(formData);

    // Insert validated data into the database
    const newTest = await prisma.readingTest.create({
      data: {
        title: validatedData.title,
        passages: {
          create: validatedData.passages.map((passage) => ({
            passageTitle: passage.passageTitle,
            content: passage.content,
            questions: {
              create: passage.questions.map((question) => ({
                questionTitle: question.questionTitle,
                questionDescription: question.questionDescription,
                questionText: question.questionText,
                type: question.type,
                answer:
                  question.type === "MULTIPLE_CHOICE" ? question.answer : null,
                correctAnswer: question.correctAnswer || "",
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "Test created", test: newTest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating test:", error);
    return NextResponse.json(
      { message: "Failed to create test", error },
      { status: 500 }
    );
  }
}
