import { cookies } from "next/headers";

export function getCookie(name: string) {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value;
}

export function setCookie(name: string, value: string) {
  const cookieStore = cookies();
  cookieStore.set(name, value);
}

export function getTheme() {
  return getCookie("lightmode") === "true" ? "light" : "dark";
}
