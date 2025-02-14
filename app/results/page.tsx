"use client";
import { useCallback, useEffect, useState } from "react";
import { BREEDS_URL, LOGOUT_URL } from "../lib/api";
import { useRouter } from "next/navigation";

export default function Results() {
  const [breeds, setBreeds] = useState();

  const router = useRouter();

  const logout = useCallback(async () => {
    await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include"
    })
    router.push('/')
  }, [router])

  useEffect(() => {
    async function fetchData() {
      const breeds = await fetch(BREEDS_URL, { credentials: "include" });
      if (breeds.ok) {
        setBreeds(await breeds.json());
      }
    }
    fetchData();
  }, []);
  // const breeds_json = await breeds.json()
  console.log(breeds);
  // console.log(breeds_json)
  return <div>
    <a onClick={logout}>Logout</a>
    {JSON.stringify(breeds)}
    </div>;
}
