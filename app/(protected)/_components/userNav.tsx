"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserProfileNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center p-4 shadow-sm md:flex-row rounded-xl">
      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          variant={
            pathname === "/user-profile/my-dashboard" ? "default" : "outline"
          }
        >
          <Link href={"/user-profile/my-dashboard"}>Profile</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/user-profile/settings" ? "default" : "outline"
          }
        >
          <Link href={"/user-profile/settings"}>Settings</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/user-profile/practice-history"
              ? "default"
              : "outline"
          }
        >
          <Link href={"/user-profile/practice-history"}>History</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/user-profile/my-wallet" ? "default" : "outline"
          }
        >
          <Link href={"/user-profile/my-wallet"}>Ví</Link>
        </Button>
      </div>
    </div>
  );
};
