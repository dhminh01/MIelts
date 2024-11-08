import fs from "fs";
import path from "path";
import { IncomingMessage } from "http";
import { NextResponse } from "next/server";

// Assuming you are saving to a local directory
export const saveAvatarFile = async (file: Express.Multer.File) => {
  const uploadsDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadsDir, file.originalname);

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Save the file to disk (you can replace this with cloud storage logic)
  fs.writeFileSync(filePath, file.buffer);

  return `/uploads/${file.originalname}`;
};
