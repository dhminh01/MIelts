import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure you have Prisma client configured in your project

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, dob, phone, hometown, address, idCardImage, certProof } =
      data;

    if (
      !name ||
      !dob ||
      !phone ||
      !hometown ||
      !address ||
      !idCardImage ||
      !certProof
    ) {
      console.log(data);
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const instructor = await prisma.instructor.create({
      data: {
        name,
        dob: new Date(dob),
        phone,
        hometown,
        address,
        idCardImage,
        certProof,
      },
    });

    return NextResponse.json({ instructor }, { status: 201 });
  } catch (error) {
    console.error("Error saving instructor:", error);
    return NextResponse.json(
      { error: "Failed to save instructor" },
      { status: 500 }
    );
  }
}
