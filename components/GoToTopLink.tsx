"use client";

import { Button } from "./Button";
import { ChevronDown } from "./icons/ChevronDown";

export function GoToTopLink() {
  return (
    <Button
      onClick={() =>
        document.querySelector("main")?.scrollTo(0, 0)
      }
      variant="ghost"
    >
      Go to top
      <ChevronDown
        style={{
          transformOrigin: "center center",
          rotate: "180deg",
        }}
      />
    </Button>
  );
}
