export function createDependencyKey(deps: any[]): string {
  if (deps.length === 0) {
    return "_";
  }
  try {
    return JSON.stringify(deps);
  } catch (err) {
    try {
      return toString(deps);
    } catch (err) {
      try {
        return deps.join("_");
      } catch (err) {
        return "{{!Unparsable!}}";
      }
    }
  }
}

function toString(test: any): string {
  if (Array.isArray(test)) return test.map(toString).join("_");
  switch (typeof test) {
    case "object":
      try {
        return JSON.stringify(test);
      } catch (err) {
        return "{{UnparsableObject}}";
      }
    case "function":
      try {
        return (
          test.toString() + (test?.name ? `_${test.name}` : "")
        );
      } catch (err) {
        return "{{UnparsableFunction}}";
      }
    case "undefined":
      return "undefined";
    case "symbol":
    case "bigint":
    case "number":
      return test.toString();
    default:
      return test;
  }
}
