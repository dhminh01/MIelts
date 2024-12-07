import prisma from "@/lib/db";

export async function getInstructors() {
    const instructors = await prisma.user.findMany({
      where: { role: "INSTRUCTOR" },
      select: { id: true, name: true, email: true },
    });
    return instructors;
  }
  