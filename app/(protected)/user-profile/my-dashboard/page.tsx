"use client";

import ScoreChart from "@/components/scoreChart";
import { useSession } from "next-auth/react";

export default function UserDashboard() {
  const session = useSession();
  const userId = session.data?.user.id;

  return <ScoreChart userId={userId} />;
}
