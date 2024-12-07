import prisma from "@/lib/db";

export async function fetchAllRequests() {
  try {
    const requests = await prisma.requestInfo.findMany({
      include: {
        user: true, // Include user data if needed
      },
    });
    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
}
