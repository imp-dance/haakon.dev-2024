"use client";

import { ChevronDownIcon } from "./svg/ChevronDownIcon";
import { Button } from "./ui/Button";

export function GoToTopLink() {
  return (
    <Button
      onClick={() => window.scrollTo(0, 0)}
      variant="ghost"
    >
      Go to top
      <ChevronDownIcon
        style={{
          transformOrigin: "center center",
          rotate: "180deg",
        }}
      />
    </Button>
  );
}
