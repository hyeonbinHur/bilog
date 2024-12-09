"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";

const page = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          welcome back
          <Button onClick={() => signOut({ callbackUrl: `/` })}>
            {JSON.stringify(session)}
            Sign Out
          </Button>
        </>
      ) : (
        <>
          Sign in
          <Button onClick={() => signIn("google")}>Sign in with google</Button>
          <Button onClick={() => signIn("github")}>Sign in with Github</Button>
          <Button onClick={() => signIn("kakao")}>Sign in with Kakao</Button>
        </>
      )}
    </div>
  );
};

export default page;
