"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import HeroImage from "@/public/hannah-lim-U6nlG0Y5sfs-unsplash.jpg";

import { LOGIN_URL } from "./lib/api";
import { Input } from "./ui/input";

export default function Home() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const login = useCallback(
    async (formData: FormData) => {
      setPending(true);
      const name = formData.get("name");
      const email = formData.get("email");
      const body = JSON.stringify({ name, email });
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        body,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        router.push("/results");
      } else {
        setError("Please enter a name and email.");
        setPending(false);
      }
    },
    [router]
  );

  return (
    <>
      <div className="hero flex-1 max-w-screen-md self-center">
        <div className="hero-content text-center grid grid-cols-2 rounded-lg p-0 m-10 border-slate-600 border border-solid bg-base-200">
          <div className="relative rounded-l-lg p-0">
            <Image
              className="rounded-l-lg p-0"
              alt="A collection of cute dogs"
              src={HeroImage}
            />
            <aside className="absolute bottom-0 text-white bg-opacity-60 bg-slate-600 w-full">
              <p>
                Photo by{" "}
                <a
                  className="link"
                  href="https://unsplash.com/@hannah15198?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                >
                  Hannah Lim
                </a>{" "}
                on{" "}
                <a
                  className="link"
                  href="https://unsplash.com/photos/litter-of-dogs-fall-in-line-beside-wall-U6nlG0Y5sfs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                >
                  Unsplash
                </a>
              </p>
            </aside>
          </div>

          <div className="p-4 text-base-content flex flex-col gap-4 justify-around">
            <h1 className="text-3xl">
              Welcome to{" "}
              <span className="text-4xl text-nowrap">🐶DogSearch🐶</span>
            </h1>
            <p className=" text-sm  text-center mx-2">
              Enter your name and email to begin searching for the perfect furry
              friend
            </p>
            <form
              action={login}
              className="mt-4 p-4 rounded-lg bg-accent text-accent-content"
            >
              {error.length > 0 && <p className="text-warning">{error}</p>}

              <Input
                id="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
              <Input
                id="email"
                label="Email"
                placeholder="name@example.com"
                type="email"
              />

              <button
                type="submit"
                className={clsx(
                  "btn mt-5",
                  pending ? "btn-disabed" : "btn-primary"
                )}
                disabled={pending}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex-grow footer footer-center bg-base-200 text-base-content"></div>
    </>
  );
}
