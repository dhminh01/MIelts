import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Utility function to save the uploaded file
const saveFile = async (file: Blob, filename: string) => {
  const filePath = path.join(process.cwd(), "public", "uploads", filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${filename}`;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const dob = formData.get("dob") as string;
    const phone = formData.get("phone") as string;
    const hometown = formData.get("hometown") as string;
    const address = formData.get("address") as string;
    const idCardImage = formData.get("idCardImage") as Blob;

    // Generate a unique filename for the ID card image
    const filename = `${Date.now()}_${idCardImage.name}`;

    // Save the ID card image
    const savedImagePath = await saveFile(idCardImage, filename);

    // Process the data (e.g., save to the database)
    // Example saving the instructor info:
    const instructorData = {
      name,
      dob,
      phone,
      hometown,
      address,
      idCardImage: savedImagePath,
    };

    // Assuming you have a function to save this data to your database
    // await saveInstructorToDatabase(instructorData);

    return NextResponse.json({
      message: "Đăng ký giảng viên thành công",
      instructorData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Đã xảy ra lỗi trong quá trình đăng ký" },
      { status: 500 }
    );
  }
}
