import Link from "next/link";
import React from "react";

export default function Footer() {
  const footerRoutes = [
    { label: "Câu hỏi thường gặp", path: "/frequently-asked-questions" },
    { label: "Đánh giá chất lượng dịch vụ", path: "/ratings" },
  ];
  return (
    <footer>
      <div className="flex flex-col gap-x-5">
        {footerRoutes.map((routes) => (
          <Link
            href={routes.path}
            key={routes.path}
            className="py-2 hover:text-primary"
          >
            {routes.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
