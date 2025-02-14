"use client";
import { useCallback, useEffect, useState } from "react";
import { BREEDS_URL, DOGS_URL, LOGOUT_URL, SEARCH_URL } from "../lib/api";
import { useRouter } from "next/navigation";
import { Dog } from "../lib/types";
import { divide } from "lodash";
import { DogCard } from "../ui/dogCard";

const PAGE_SIZE = 10;

export default function Results() {
  const router = useRouter();

  const [page, setPage] = useState(0);
  //   Use modal to allow filtering by multiple breeds
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [sortTerm, setSortTerm] = useState<"name" | "breed">("breed");
  const [sortDirection, setSortDirection] = useState("asc");

  const logout = useCallback(async () => {
    await fetch(LOGOUT_URL, {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  }, [router]);

  // Fetch list of dog breeds for filtering
  useEffect(() => {
    async function fetchData() {
      const breedsResponse = await fetch(BREEDS_URL, {
        credentials: "include",
      });

      if (breedsResponse.ok) {
        setBreeds(await breedsResponse.json());
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDogs(dogIds: string[]) {
      const dogSearchResponse = await fetch(DOGS_URL, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dogIds),
      });
      if (dogSearchResponse.ok) {
        const json = await dogSearchResponse.json();
        setDogs(json);
      }
    }

    async function fetchDogSearch() {
      const params = new URLSearchParams({
        size: PAGE_SIZE.toFixed(0),
        from: (page * PAGE_SIZE).toFixed(0),
        sort: "breed:asc",
      });
      const dogSearchResponse = await fetch(`${SEARCH_URL}?${params}`, {
        credentials: "include",
      });
      if (dogSearchResponse.ok) {
        const json = await dogSearchResponse.json();
        setDogIds(json["resultIds"]);
        fetchDogs(json["resultIds"]);
      }
    }
    fetchDogSearch();
  }, [page]);

  return (
    <div className="grid grid-cols-3 max-w-screen-xl max-h-screen">
      <a className="cols-span-3" onClick={logout}>
        Logout
      </a>
      <h1 className="text-4xl text-primary col-span-3">Dogs</h1>
      <div className="col-span-3 grid grid-rows-2 grid-cols-5 gap-4">
        {dogs.map((d) => (
          <DogCard key={d.id} dog={d} />
        ))}
      </div>

      {/* {JSON.stringify(breeds)} */}
      <p>{JSON.stringify(dogIds)}</p>
      <p>{JSON.stringify(dogs)}</p>
    </div>
  );
}
