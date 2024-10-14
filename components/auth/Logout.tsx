"use client";

import { logout } from "@/actions/auth";

export default function Logout() {
  return (
    <div onClick={() => logout()}>
      <div className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md cursor-pointer">
        logout
      </div>
    </div>
  );
}
