"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-300 via-[#b219fa] to-yellow-400">
      <div className="text-center text-accent-content">
        <h1 className="mb-4 text-4xl font-bold">TailwindCSS - DaisyUI</h1>
        <div className="mb-6 grid grid-cols-2 gap-2">
          <div className="col-span-2 md:col-span-1">
            <Link
              prefetch={false}
              href="/auth/login"
              className="btn btn-info btn-wide mx-2"
            >
              Login
            </Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link
              prefetch={false}
              href="/auth/register"
              className="btn btn-secondary btn-wide mx-2"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
