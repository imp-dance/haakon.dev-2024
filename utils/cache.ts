import { createDependencyKey } from "./createDependencyKey";

/**
 * Caches the result of a function based on its arguments.
 * Will prevent the function from being called again if the same arguments are passed.
 */
export function cachedFn<TReturn, TArgs extends any[] = []>(
  fn: (...args: TArgs) => TReturn,
  extraDependencies?: () => any[]
) {
  const cache = new Map<string, TReturn>();

  return (...args: TArgs): TReturn => {
    const key = createDependencyKey([
      ...args,
      ...(extraDependencies?.() ?? []),
    ]);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...(args as TArgs));
    cache.set(key, result);
    return result;
  };
}
