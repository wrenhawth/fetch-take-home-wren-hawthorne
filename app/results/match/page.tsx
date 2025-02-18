"use client";
import { DOGS_URL } from "@/app/lib/api";
import { Dog } from "@/app/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Match() {
  const router = useRouter();

  const params = useSearchParams();
  const matchId = params.get("id");
  const [dog, setDog] = useState<Dog | null>(null);

  useEffect(() => {
    const fetchDog = async (id: string) => {
      const dogSearchResponse = await fetch(DOGS_URL, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify([id]),
      });

      if (dogSearchResponse.ok) {
        const json: Dog[] = await dogSearchResponse.json();
        setDog(json[0]);
      }
    };

    if (dog == null && matchId) {
      fetchDog(matchId);
    }
  }, [dog, matchId]);

  return (
    <div className="hero flex-1 max-w-screen-md self-center">
      <div className="hero-content text-center grid grid-cols-2 rounded-lg p-0 m-10 border-slate-600 border border-solid bg-base-200">
        <div className="relative rounded-l-lg p-0">
          {dog == null ? (
            <div className="loading h-64" />
          ) : (
            <img
              className="rounded-l-lg p-0"
              alt="A collection of cute dogs"
              src={dog?.img}
            />
          )}
        </div>

        <div className="p-4 text-base-content flex flex-col gap-4 justify-around">
          {dog == null && <h1 className="text-3xl">Match Loading</h1>}
          {dog != null && (
            <>
              <h1 className="text-3xl text-accent">
                It&apos;s a Match!
                {/* <span className="text-4xl text-nowrap">🐶DogSearch🐶</span> */}
              </h1>
              <h2 className="text-2xl">
                You&apos;ve matched with{" "}
                <span className="text-primary font-bold">{dog?.name}</span>
              </h2>
              <p className="">
                <span className="text-primary">{dog.name} </span>is a {dog.age}{" "}
                year old <span className="font-semibold">{dog.breed}</span> and
                is located at {dog.zip_code}
              </p>
              <button className="btn btn-secondary" onClick={() => { router.push('/results')}}>
                Search Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
