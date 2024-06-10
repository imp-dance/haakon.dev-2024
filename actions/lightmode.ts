"use server";
import { cookies } from "next/headers";

export async function toggleLightmode() {
  "use server";
  const cookieStore = cookies();
  const isLightmode =
    cookieStore.get("lightmode")?.value === "true";
  cookieStore.set("lightmode", isLightmode ? "false" : "true");
  return isLightmode;
}
