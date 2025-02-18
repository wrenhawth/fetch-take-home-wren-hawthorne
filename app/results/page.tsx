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
import { Pagination, PaginationInfo } from "../ui/pagination";
import _ from "lodash";

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
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);

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

  const onToggle = useCallback((dogId: string) => {
    setSelectedDogs((selectedDogs) => {
      if (selectedDogs.includes(dogId)) {
        return selectedDogs.filter((id) => id !== dogId);
      } else {
        return [...selectedDogs, dogId];
      }
    });
  }, []);
  return (
    <>
      <div className="grid grid-cols-2">
        <Pagination
          paginationInfo={paginationInfo}
          setSearchString={setSearchString}
        />
        <button className="btn btn-primary btn-md w-1/2 m-auto" disabled={selectedDogs.length === 0}>
            ✨ Find A Match ✨
        </button>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <h2 className="font-semibold">Selected Dogs</h2>
          <div>
            {selectedDogs.map((selectedId) => {
              return (
                <div
                  key={selectedId}
                  className="badge badge-lg badge-secondary block my-2 cursor-pointer"
                >
                  {dogMap.current.get(selectedId)?.name}{" "}
                  <span
                    className="font-semibold"
                    onClick={() => onToggle(selectedId)}
                  >
                    X
                  </span>
                  {/* <button className="btn btn-xs">-</button> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-10 grid grid-rows-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dogs.map((d) => (
            <DogCard
              key={d.id}
              dog={d}
              selected={selectedDogs.includes(d.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
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
