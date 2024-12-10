// This is the Server Component that fetches data

import AllSkillsList from "@/components/filter/AllSkillsList";
import prisma from "@/lib/db";

export default async function AllSkillsListServer() {
  // Fetch tests from each skill-specific model (Server-side)
  const listeningTests = await prisma.listeningTest.findMany({
    select: { id: true, title: true },
  });
  const readingTests = await prisma.readingTest.findMany({
    select: { id: true, title: true },
  });
  const writingTests = await prisma.writingTest.findMany({
    select: { id: true, title: true },
  });
  const speakingTests = await prisma.speakingTest.findMany({
    select: { id: true, title: true },
  });

  // Pass data to the Client Component as props
  return (
    <AllSkillsList
      listeningTests={listeningTests}
      readingTests={readingTests}
      writingTests={writingTests}
      speakingTests={speakingTests}
    />
  );
}
