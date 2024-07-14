import Fuse from "fuse.js";
import { useMemo } from "react";

export function useFuzzySearch<T>(data: T[], search: string) {
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: ["subject"],
        threshold: 0.3,
      }),
    [data]
  );

  const processedData = useMemo(
    () =>
      search
        ? [...fuse.search(search)].map((i) => i.item)
        : data,
    [search, fuse, data]
  );

  return processedData;
}
