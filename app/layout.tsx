import { toggleLightmode } from "@/actions/lightmode";
import { LightmodeToggle } from "@/components/LightmodeToggle";
import { getTheme } from "@/services/cookies";
import { ToastProvider } from "@/services/toast";
import "@pigment-css/react/styles.css";
import classNames from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Håkon Underbakke",
  description:
    "I'm a Norwegian frontend developer currently doing contract work for my own company, Ryfylke React AS. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLightmode = getTheme() === "light";

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/open-props"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/open-props/normalize.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/open-props/buttons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/open-props/masks.edges.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/open-props/masks.corner-cuts.min.css"
        />
      </head>
      <body
        className={classNames(
          inter.className,
          {
            light: isLightmode,
          },
          {
            dark: !isLightmode,
          }
        )}
      >
        {children}
        <LightmodeToggle
          onChange={toggleLightmode}
          initialValue={isLightmode}
        />
        <ToastProvider />
      </body>
    </html>
  );
}
