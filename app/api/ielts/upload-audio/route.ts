import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Use request.formData() to parse the incoming FormData
    const formData = await req.formData();

    // Extract the file from the FormData
    const file = formData.get("audio");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Set up the file path in the public directory
    const savePath = path.join(process.cwd(), "public", "save_audio");
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    // Create a unique filename to avoid overwriting
    const filename = `recording-${Date.now()}.mp3`;
    const filePath = path.join(savePath, filename);

    // Write the file to the public/save_audio directory
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Return the saved file path in the response
    return NextResponse.json({ audioPath: `/save_audio/${filename}` });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json(
      { error: "Error uploading audio" },
      { status: 500 }
    );
  }
}
