"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row w-full h-full">
          <Sidebar />
          <div className="m-2 w-full text-black">{children}</div>
        </div>
      </body>
    </html>
  );
}
