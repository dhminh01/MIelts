import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Prisma client
import { z } from "zod";
import fs from "fs";
import path from "path";

// Zod schema for validation
const ListeningTestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isTimed: z.boolean(),
  transcript: z.string().optional(),
  sections: z.array(
    z.object({
      sectionTitle: z.string().min(1, "Section title is required"),
      audioFile: z.any(), // This will be handled by multer or alternative upload handling
      questions: z.array(
        z.object({
          questionText: z.string().min(1, "Question text is required"),
          type: z.enum([
            "MULTIPLE_CHOICE",
            "FILL_IN_THE_BLANK",
            "SHORT_ANSWER",
          ]),
          answer: z
            .object({
              options: z
                .array(
                  z.object({
                    label: z.string().min(1),
                    option: z.string().min(1),
                  })
                )
                .optional(),
            })
            .optional(),
          correctAnswer: z.string().min(1, "Correct answer is required"),
        })
      ),
    })
  ),
});

// Handle POST request
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract the uploaded file from the form data
    const audioFile = formData.get("audioFile");

    if (!audioFile || !(audioFile instanceof File)) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    // Store the file to a location (adjust based on your file storage setup)
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const fileName = `${Date.now()}-${audioFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the audio file locally
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const data = Object.fromEntries(formData.entries());

    // Validate the data using Zod
    const validatedData = ListeningTestSchema.parse(data);

    // Create the ListeningTest in the database with the uploaded audio URL
    const createdTest = await prisma.listeningTest.create({
      data: {
        title: validatedData.title,
        isTimed: validatedData.isTimed,
        transcript: validatedData.transcript,
        sections: {
          create: validatedData.sections.map((section) => ({
            sectionTitle: section.sectionTitle,
            audioURL: `/uploads/${fileName}`, // Store the uploaded file path (relative to public folder)
            questions: {
              create: section.questions.map((question) => ({
                questionText: question.questionText,
                type: question.type,
                answer:
                  question.type === "MULTIPLE_CHOICE" ? question.answer : null,
                correctAnswer: question.correctAnswer,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Listening test created successfully",
      test: createdTest,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
