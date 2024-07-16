type Target = string | HTMLElement | null | SVGElement;
export type GSAPAnimationMap = Record<
  string,
  (el: Target, trigger?: Target) => void
>;
/**
 * Properly types creation and usage of GSAP animations written outside component.
 */
export const createAnimationMap = <TKeys extends string>(
  animations: Record<
    TKeys,
    (el: Target, trigger?: Target) => void
  >
): {
  [K in TKeys]: (el: Target, trigger?: Target) => void;
} => animations as any;
