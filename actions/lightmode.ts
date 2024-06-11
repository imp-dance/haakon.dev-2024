"use server";
import { getTheme } from "@/services/cookies";
import { cookies } from "next/headers";

export async function toggleLightmode() {
  "use server";
  const cookieStore = cookies();
  const isLightmode = getTheme() === "light";
  cookieStore.set("lightmode", isLightmode ? "false" : "true");
  return isLightmode ? false : true;
}
