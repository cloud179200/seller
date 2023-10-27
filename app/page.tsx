"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-300 via-[#b219fa] to-yellow-400">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">TailwindCSS - DaisyUI</h1>
        <div className="mb-6 grid grid-cols-2 gap-2">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/auth/login"
              className="btn-info btn-wide btn mx-2"
            >
              Login
            </Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/auth/register"
              className="btn-secondary btn-wide btn mx-2"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
