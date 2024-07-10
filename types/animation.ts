type Target = string | HTMLElement | null | SVGElement;
export type GSAPAnimationMap = Record<
  string,
  (el: Target, trigger?: Target) => void
>;
