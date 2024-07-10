"use client";

import { ChevronDown } from "./icons/ChevronDown";
import { Button } from "./ui/Button";

export function GoToTopLink() {
  return (
    <Button
      onClick={() => window.scrollTo(0, 0)}
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
