"use client";
import React from "react";
import NotFoundPNG from "@/public/images/404.png";
import SearchSVG from "@/public/images/search.svg";
import Link from "next/link";

const NotFoundComponent = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white px-8 py-12 text-center shadow-md">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-gray-600">
          Oops! The page you're looking for does not exist.
        </p>
        <img src={SearchSVG.src} width="100" alt="img" />
        <img src={NotFoundPNG.src} width="300" alt="img" />
        <Link href="/" className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFoundComponent;
