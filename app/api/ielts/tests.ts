import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tests = await db.ieltsTest.findMany({
        select: {
          id: true,
          title: true,
          part: true,
          skill: true,
        },
      });
      res.status(200).json(tests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching tests" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
