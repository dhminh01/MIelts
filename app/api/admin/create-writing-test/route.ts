import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import prisma from "@/lib/db"; // Prisma client
import formidable from "formidable"; // Import formidable for handling form data
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

// Helper function to save the file
async function saveFile(file: Buffer, fileName: string) {
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);
  fs.writeFileSync(filePath, file);
  return `/uploads/${fileName}`;
}

// POST handler for file upload and test creation
export async function POST(request: NextRequest) {
  // Ensure we only parse for file uploads when necessary
  if (!request.body) {
    return NextResponse.json({ error: "No body received" }, { status: 400 });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), "public", "uploads"),
    keepExtensions: true, // Keep the file extensions
    multiples: true, // Allow multiple files per field if needed
    filename: (name, ext, part, form) => randomUUID() + ext, // Custom file name
  });

  // Wrap the form parsing in a Promise so it works with async/await
  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(request.body, async (err, fields, files) => {
      if (err) {
        reject(
          NextResponse.json(
            { error: "Error parsing the form" },
            { status: 400 }
          )
        );
        return;
      }

      const {
        title,
        task1Title,
        task2Title,
        task1_description,
        task2_description,
        task1_word_limit,
        task2_word_limit,
      } = fields;

      const { task1_image, task2_image } = files;

      let task1_imageURL = "";
      let task2_imageURL = "";

      // Handle task1 image file upload
      if (task1_image && Array.isArray(task1_image)) {
        task1_imageURL = `/uploads/${task1_image[0].newFilename}`;
      }

      // Handle task2 image file upload
      if (task2_image && Array.isArray(task2_image)) {
        task2_imageURL = `/uploads/${task2_image[0].newFilename}`;
      }

      const task1WordLimit = parseInt(task1_word_limit as string, 10);
      const task2WordLimit = parseInt(task2_word_limit as string, 10);

      try {
        // Create Writing test entry in the database
        const newTest = await prisma.writingTest.create({
          data: {
            title,
            task1Title,
            task2Title,
            task1_description,
            task2_description,
            task1_imageURL,
            task2_imageURL,
            task1_word_limit: task1WordLimit,
            task2_word_limit: task2WordLimit,
          },
        });

        resolve(NextResponse.json(newTest, { status: 200 }));
      } catch (error) {
        reject(
          NextResponse.json(
            { error: "Failed to create writing test" },
            { status: 500 }
          )
        );
      }
    });
  });
}

// Handle OPTIONS request for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
