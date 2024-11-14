"use server";

import prisma from "@/lib/db";
import fs from "fs";
import path from "path";

// Function to save the uploaded audio file to the server and return the file path
const saveAudioFile = async (file: File) => {
  if (!file || !file.name) {
    throw new Error("No file provided or file name is missing");
  }

  const uploadDir = path.join(process.cwd(), "uploads"); // Ensure the folder exists
  const filePath = path.join(uploadDir, file.name);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.promises.writeFile(filePath, buffer); // Save the file

  return `/uploads/${file.name}`;
};

export const createListeningTest = async (formData: FormData) => {
  try {
    // Extract form fields
    const { title, isTimed, transcript, sections } = {
      title: formData.get("title") as string,
      isTimed: formData.get("isTimed") === "true",
      transcript: formData.get("transcript") as string,
      sections: JSON.parse(formData.get("sections") as string) || [],
    };

    // Process each section to handle file uploads and other data
    const sectionsWithAudioURL = await Promise.all(
      sections.map(async (section: any) => {
        let audioFilePath = null;

        // Handle audio file upload for the section if it exists
        if (section.audioFile) {
          audioFilePath = await saveAudioFile(section.audioFile);
        }

        return {
          sectionTitle: section.sectionTitle,
          audioURL: audioFilePath,
          questions: section.questions.map((question: any) => ({
            questionText: question.questionText,
            type: question.type,
            answer: question.answer,
            correctAnswer: question.correctAnswer,
          })),
        };
      })
    );

    // Save the listening test to the database using Prisma
    await prisma.listeningTest.create({
      data: {
        title,
        isTimed,
        transcript,
        sections: {
          create: sectionsWithAudioURL,
        },
      },
    });

    console.log("Listening test created successfully");
  } catch (error) {
    console.error("Error creating listening test:", error);
    throw new Error("Failed to create listening test");
  }
};
