"use client";
import { useEffect, useState } from "react";
import { BREEDS_URL } from "../lib/api";

export default function Results() {
  const [breeds, setBreeds] = useState();


  useEffect(() => {
    async function fetchData() {
        const breeds = await fetch(BREEDS_URL, { credentials: "include" });
        if (breeds.ok) {
            setBreeds(await breeds.json());
        }
    }
    fetchData()
  }, []);
  // const breeds_json = await breeds.json()
  console.log(breeds);
  // console.log(breeds_json)
  return (<div>
    {JSON.stringify(breeds)}
  </div>)
}
