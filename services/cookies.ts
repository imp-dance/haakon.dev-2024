import { cookies } from "next/headers";

export function getTheme() {
  const cookieStore = cookies();
  const isLightmode =
    cookieStore.get("lightmode")?.value === "true";
  return isLightmode ? "light" : "dark";
}
