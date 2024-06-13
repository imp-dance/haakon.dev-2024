export function getDocument() {
  if (typeof document !== "undefined") {
    return document;
  }
  return undefined;
}
