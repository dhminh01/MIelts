import prisma from "@/lib/db";

export async function fetchRequestStatus(testHistoryId: string) {
  const request = await prisma.requestInfo.findFirst({
    where: { testHistoryId },
    select: { status: true },
  });

  return request?.status || null; // Return the status or null if not found
}
