type Target = string | HTMLElement | null;
export type GSAPAnimationMap = Record<
  string,
  (el: Target, trigger?: Target) => void
>;
