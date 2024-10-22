import Link from "next/link";
import React from "react";

function UserProfileNav() {
  const navProfile = [
    { label: "Hồ sơ", path: "/user-profile/profile" },
    { label: "Cài đặt", path: "/user-profile/settings" },
  ];
  return (
    <div>
      {navProfile.map((routes) => (
        <Link
          href={routes.path}
          key={routes.path}
          className="py-2 text-sm font-semibold lg:text-base hover:text-primary"
        >
          {routes.label}
        </Link>
      ))}
    </div>
  );
}

export default UserProfileNav;
