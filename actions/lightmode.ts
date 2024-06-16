"use server";
import { cookies } from "next/headers";
import { getTheme } from "../services/cookies";

export async function toggleLightmode() {
  "use server";
  const cookieStore = cookies();
  const isLightmode = getTheme() === "light";
  cookieStore.set("lightmode", isLightmode ? "false" : "true");
  return isLightmode ? false : true;
}
