import React from "react";
import CustomProviders from "./providers";
import { Metadata } from "next";
import "./assets/scss/style.scss";
import "./assets/css/output.css";
export const metadata: Metadata = {
  title: "Base NextJs 13 Application - hosted by Viet Anh",
  description:
    "Discover a cutting-edge web application powered by Next.js 13 and Prisma. Our platform combines the latest in web development technology to deliver a seamless user experience. With Next.js 13's enhanced performance and Prisma's powerful database management, our application sets a new standard for speed and efficiency. Explore a range of dynamic features and responsive design that make browsing a breeze. Experience the future of web applications with us!",
  icons: {
    icon: "./favicon.ico",
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className="font-san-francisco" suppressHydrationWarning={true}>
        <CustomProviders>{children}</CustomProviders>
      </body>
    </html>
  );
}
export default RootLayout;
