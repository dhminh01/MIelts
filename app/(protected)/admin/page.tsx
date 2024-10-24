import Link from "next/link";
import React from "react";

function AdminPage() {
  const adminComponents = [
    { Label: "Quản lý bài luyện thi", path: "/admin/tests" },
    { Label: "Quản lý tài khoản", path: "/admin/users" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {adminComponents.map((routes) => (
        <Link
          href={routes.path}
          key={routes.path}
          className="py-2 text-sm font-semibold lg:text-base hover:text-primary"
        >
          {routes.Label}
        </Link>
      ))}
    </div>
  );
}

export default AdminPage;
