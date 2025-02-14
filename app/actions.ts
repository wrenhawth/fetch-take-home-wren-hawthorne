"use server";

import { redirect } from "next/navigation";
import { LOGIN_URL, LOGOUT_URL } from "./lib/api";

export async function loginAction(prevState: unknown, formData: FormData) {
  let res: Response | null = null;
  const name = formData.get("name");
  const email = formData.get("email");
  const body = JSON.stringify({ name, email });
  try {
    res = await fetch(LOGIN_URL, {
      body,
      headers: { "content-type": "application/json"},
      method: "POST",
      credentials: "include",
    });
    console.log(res)
    if (!res.ok) {
        return {
            message: 'Please enter a name and email.'
        }
    }
  } catch (error) {
    console.error(error);
  }

  if (res?.ok) {
    console.log("Logged in")
    redirect("/results");
  }
}

export async function logoutAction() {
  await fetch(LOGOUT_URL, { method: "POST", credentials: "include" });
  redirect("/");
}
