"use server";

import { signIn, signOut } from "@/auth";

export async function handleLogin(formData) {
  // const action = formData.get("action");
  await signIn("google", { redirectTo: "/bost/dashboard" });
}

export async function handleLogout(){
  await signOut({ redirectTo: "/bost" });
}


