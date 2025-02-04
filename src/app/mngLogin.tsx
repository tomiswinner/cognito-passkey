"use client";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const MngLogin: NextPage = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  if (session && session.user) {
    return (
      <>
        You are {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default MngLogin;
