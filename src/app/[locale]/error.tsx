"use client";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen">
      <div className="absolute top-[30%] flex flex-col items-center w-96 gap-4">
        <h1 className="font-bold text-6xl">404</h1>
        <p className="text-xl text-gray-600  text-center">
          {error.message
            ? error.message
            : "Oops, it looks like the page you&apos;re looking doesn&apos;t exist."}
        </p>
        <div className="flex gap-5">
          <Button
            className="w-40"
            onClick={() => {
              startTransition(() => {
                router.refresh();
                reset();
              });
            }}
          >
            Reset Page
          </Button>
          <Button
            variant="outline"
            className="bg-black text-gray-100 text-pretty w-40"
          >
            <Link href={"/"}>Back to main page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
