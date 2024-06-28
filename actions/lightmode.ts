"use server";
import { getCookie, setCookie } from "../services/cookies";

export async function toggleLightmode() {
  "use server";
  const isLightmode = getCookie("lightmode") === "true";
  setCookie("lightmode", isLightmode ? "false" : "true");
  return isLightmode ? false : true;
}
