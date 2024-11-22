import prisma from "@/lib/db";

// Fetch tests by skill (server action)
export async function fetchTestsBySkill(skill: string) {
  switch (skill.toUpperCase()) {
    case "LISTENING":
      return await prisma.listeningTest.findMany();
    case "READING":
      return await prisma.readingTest.findMany();
    case "WRITING":
      return await prisma.writingTest.findMany();
    case "SPEAKING":
      return await prisma.speakingTest.findMany();
    default:
      throw new Error("Invalid skill");
  }
}

// Delete test by skill and testId (server action)
export async function deleteTest(skill: string, testId: string) {
  switch (skill.toUpperCase()) {
    case "LISTENING":
      return await prisma.listeningTest.delete({ where: { id: testId } });
    case "READING":
      return await prisma.readingTest.delete({ where: { id: testId } });
    case "WRITING":
      return await prisma.writingTest.delete({ where: { id: testId } });
    case "SPEAKING":
      return await prisma.speakingTest.delete({ where: { id: testId } });
    default:
      throw new Error("Invalid skill");
  }
}
