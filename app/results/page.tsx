"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BASE_URL,
  BREEDS_URL,
  DOGS_URL,
  LOGOUT_URL,
  SEARCH_URL,
} from "../lib/api";
import { redirect, useRouter } from "next/navigation";
import { Dog } from "../lib/types";
import { DogCard } from "../ui/dogCard";
import { Pagination } from "../ui/pagination";

const PAGE_SIZE = 25;

type SortInfo = {
  term: "name" | "breed";
  direction: "asc" | "desc";
};

const DEFAULT_SORT: SortInfo = {
  term: "breed",
  direction: "asc",
};

export default function Results() {
  const router = useRouter();

  const [page, setPage] = useState(0);
  //   Use modal to allow filtering by multiple breeds
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogIds, setDogIds] = useState<string[]>([]);
  const dogMap = useRef<Map<string, Dog>>(new Map());
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null
  );
  const [searchString, setSearchString] = useState<string>("");
  const [sortInfo, setSortInfo] = useState<SortInfo>(DEFAULT_SORT);

  // Fetch list of dog breeds for filtering
  useEffect(() => {
    async function fetchData() {
      const breedsResponse = await fetch(BREEDS_URL, {
        credentials: "include",
      });
      if (breedsResponse.status === 401) {
        redirect("/");
      }
      if (breedsResponse.ok) {
        setBreeds(await breedsResponse.json());
      }
    }
    fetchData();
  }, []);

  // Fetch individual dogs when page or sortinfo changes
  useEffect(() => {
    async function fetchDogs(dogIds: string[]) {
      const dogSearchResponse = await fetch(DOGS_URL, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dogIds),
      });

      if (dogSearchResponse.ok) {
        const json: Dog[] = await dogSearchResponse.json();
        setDogs(json);
        json.forEach((d) => {
          if (!dogMap.current.has(d.id)) {
            dogMap.current.set(d.id, d);
          }
        });
      }
    }

    async function fetchDogSearch(dogSearchString?: string) {
      console.log(`dogSearchString: ${dogSearchString}`);
      const resetPaginationParams = new URLSearchParams({
        from: "0",
        size: "10",
        sort: `${sortInfo.term}:${sortInfo.direction}`,
      });
      const dogSearchUrl = dogSearchString
        ? `${BASE_URL}${dogSearchString}`
        : `${SEARCH_URL}?${resetPaginationParams}`;

      const dogSearchResponse = await fetch(dogSearchUrl, {
        credentials: "include",
      });
      if (dogSearchResponse.ok) {
        const json = await dogSearchResponse.json();
        console.log(json);
        setPaginationInfo({
          total: json["total"],
          prev: json["prev"],
          next: json["next"],
        });
        setDogIds(json["resultIds"]);
        fetchDogs(json["resultIds"]);
      }
    }
    if (searchString) {
      fetchDogSearch(searchString);
    } else {
      fetchDogSearch();
    }
  }, [page, searchString, sortInfo]);

  return (
    <>
      <Pagination
        paginationInfo={paginationInfo}
        setSearchString={setSearchString}
      />
      <div className="grid grid-rows-2 grid-cols-5 gap-4">
        {dogs.map((d) => (
          <DogCard key={d.id} dog={d} />
        ))}
      </div>
      <Pagination
        paginationInfo={paginationInfo}
        setSearchString={setSearchString}
      />
      <p>{JSON.stringify(dogIds)}</p>
      <p>{JSON.stringify(dogs)}</p>
    </>
  );
}
