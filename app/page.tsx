"use client";

import Image from "next/image";
import HeroImage from "@/public/hannah-lim-U6nlG0Y5sfs-unsplash.jpg";

import { Input } from "./ui/input";
import { LOGIN_URL } from "./lib/api";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [error, setError] = useState('');
  const router = useRouter();

  const login = useCallback(async (formData: FormData) => {
    setError('')
    const name = formData.get("name");
    const email = formData.get("email");
    const body = JSON.stringify({ name, email });
    try {
      const res = await fetch(LOGIN_URL, {
        body,
        headers: {
          "Content-Type": "application/JSON",
        },
        method: "POST",
      });
      if (res.ok) {
        router.push('/results')
      } else {
        setError('Error logging in. Please try again.')
      }
    } catch (error) {
      console.error(error);
    }
  }, [router, setError]);
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="hero flex-1"
        // style={{ backgroundImage: "url(./hannah-lim-U6nlG0Y5sfs-unsplash.jpg" }}
      >
        <div className="hero-content text-center grid grid-cols-2 rounded-lg p-0 m-10 border-slate-600 border border-solid bg-base-200">
          <Image
            className="rounded-l-lg p-0"
            alt="A collection of cute dogs"
            src={HeroImage}
          />
          <div className="p-3">
            <h1 className="text-3xl">
              Welcome to{" "}
              <span className="text-4xl text-nowrap">🐶DogSearch🐶</span>
            </h1>
            <p className=" text-sm text-slate-600 mt-3 text-center mx-2">
              Enter your name and email to begin searching for the perfect furry
              friend
            </p>
            <form action={login} className="mt-2 p-4 rounded-lg bg-white">
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
              <button type="submit" className="btn btn-primary mt-5">
                Login
              </button>
              {error.length > 0 && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
      <div className="flex-grow footer footer-center bg-base-200 text-base-content">
        <aside>
          <p>
            Photo by{" "}
            <a href="https://unsplash.com/@hannah15198?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Hannah Lim
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/litter-of-dogs-fall-in-line-beside-wall-U6nlG0Y5sfs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Unsplash
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
}
