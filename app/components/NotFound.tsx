"use client";
import React from "react";
import NotFoundPNG from "@/public/images/404.png";
import SearchSVG from "@/public/images/search.svg";
import Link from "next/link";
import MinimalLayout from "@/app/components/layout/MinimalLayout/MinimalLayoutClient";

const NotFoundComponent = () => {
  return (
    <MinimalLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white max-w-md px-8 py-12 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 mb-4">
            Oops! The page you're looking for does not exist.
          </p>
          <img src={SearchSVG.src} width="100" alt="img" />
          <img src={NotFoundPNG.src} width="300" alt="img" />
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Go Back
          </Link>
        </div>
      </div>
    </MinimalLayout>
  );
};

export default NotFoundComponent;
