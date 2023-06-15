"use client";
import Animate from "@/app/components/extended/Animate";
import Link from "next/link";
import { useAppSelector } from "./redux/store";

export default function Home() {
  const commonLoading = useAppSelector(state => state.common.loadingCommon)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">TailwindCSS</h1>
        <div className="flex justify-center">
          <Animate>
          <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4" href="/auth/login" aria-disabled={commonLoading}>
              Login
          </Link>
          </Animate>
          <Animate>
          <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" href="/auth/register" aria-disabled={commonLoading}>
              Register
          </Link>
          </Animate>
        </div>
      </div>
    </div>
  );
}