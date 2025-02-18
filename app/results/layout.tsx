"use client";
import { Suspense, useCallback } from "react";
import { LOGOUT_URL } from "../lib/api";
import { useRouter } from "next/navigation";

export default function ResultsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const logout = useCallback(async () => {
    await fetch(LOGOUT_URL, {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  }, [router]);

  return (
    <div className="grid grid-cols-2 p-4 m-4 gap-4 max-w-screen-xl max-h-screen self-center items-center justify-around">
      <h1 className="text-4xl p-2 text-primary text-nowrap">🐶DogSearch🐶</h1>
      <a className="p-2 link text-right align-middle" onClick={logout}>
        Logout
      </a>
      <div className="col-span-2"><Suspense>{children}</Suspense></div>
    </div>
  );
}
