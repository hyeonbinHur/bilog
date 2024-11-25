import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNavBar from "@/components/MainNavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-center items-center px-6 ">
        <div className="2xl:w-2/5 lg:w-4/5 md:w-full">
          <MainNavBar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
