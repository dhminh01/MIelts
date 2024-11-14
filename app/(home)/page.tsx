import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="font-semibold text-slate-700 lg:text-lg">
        Bạn là giảng viên?{" "}
        <Link
          href="/instructor-registration"
          className=" hover:text-primary/80 text-primary"
        >
          Đăng ký ngay!
        </Link>
      </div>
      <h1 className="text-3xl">Landing Page</h1>
    </main>
  );
}
