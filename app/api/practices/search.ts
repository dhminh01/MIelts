// /pages/api/practices/search.ts
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Invalid query parameter" });
    }

    try {
      const practices = await prisma.ieltsPractices.findMany({
        where: {
          title: {
            contains: query, // Search for titles that contain the query string
            mode: "insensitive", // Case-insensitive search
          },
        },
      });

      return res.status(200).json(practices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
