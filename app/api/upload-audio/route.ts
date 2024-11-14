// app/api/upload-audio/route.ts

import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/audio"); // Specify the folder to store the audio files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Name the file with a timestamp
  },
});

const upload = multer({ storage: storage });

export const POST = async (req: Request) => {
  return new Promise((resolve, reject) => {
    const uploadSingleFile = upload.single("audio");

    uploadSingleFile(req, {} as any, (err: any) => {
      if (err) {
        reject(new NextResponse("Error uploading audio file", { status: 500 }));
      } else {
        const audioPath = `/uploads/audio/${req.file?.filename}`;
        resolve(
          new NextResponse(JSON.stringify({ audioURL: audioPath }), {
            status: 200,
          })
        );
      }
    });
  });
};
