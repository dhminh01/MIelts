"use client";

// import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ROLE } from "@prisma/client";
import { usePathname } from "next/navigation";

export const UserProfileNavbar = () => {
  const pathname = usePathname();
  const role = useCurrentRole();

  const handleNavigation = (url: string) => {
    window.location.href = url; // Forces a full page reload
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 shadow-sm md:flex-row rounded-xl">
      <div className="flex flex-wrap gap-2">
        {/* <Button
          onClick={() => handleNavigation("/user-profile/server")}
          variant={pathname === "/user-profile/server" ? "default" : "outline"}
        >
          Server
        </Button> */}
        <Button
          onClick={() => handleNavigation("/user-profile/my-dashboard")}
          variant={
            pathname === "/user-profile/my-dashboard" ? "default" : "outline"
          }
        >
          Dashboard
        </Button>
        <Button
          onClick={() => handleNavigation("/user-profile/settings")}
          variant={
            pathname === "/user-profile/settings" ? "default" : "outline"
          }
        >
          Settings
        </Button>
        <Button
          onClick={() => handleNavigation("/user-profile/practice-history")}
          variant={
            pathname === "/user-profile/practice-history"
              ? "default"
              : "outline"
          }
        >
          History
        </Button>
        <Button
          onClick={() => handleNavigation("/user-profile/payment")}
          variant={pathname === "/user-profile/payment" ? "default" : "outline"}
        >
          Wallet
        </Button>
        {role === ROLE.ADMIN && (
          <Button
            onClick={() => handleNavigation("/user-profile/admin")}
            variant={pathname === "/user-profile/admin" ? "default" : "outline"}
          >
            Admin
          </Button>
        )}
        {role === ROLE.INSTRUCTOR && (
          <Button
            onClick={() =>
              handleNavigation("/user-profile/instructor/user-requests")
            }
            variant={
              pathname === "/user-profile/instructor/user-requests"
                ? "default"
                : "outline"
            }
          >
            User Requests
          </Button>
        )}
      </div>
    </div>
  );
};
