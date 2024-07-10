import { SVGProps } from "react";

export const ChevronDownIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-chevron-down"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
