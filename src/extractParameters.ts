interface StringDict {
  [index: string]: string;
}

/**
 * Extracts parameters from a Link header.
 * @param header For example: `<https://example.com>; msg1="preconnect" msg2=hello`
 * @returns e.g. {msg1: "preconnect", msg2: hello}
 */
export function extractParameters(header: string): StringDict {
  if (header === "") {
    return {};
  }

  // Remove uri.
  const uriPattern = /<(.+)>/m;
  const headerWithoutUri = header.replace(uriPattern, "");

  // Extract parameters.
  const paramPattern = /(\w+)="?(\w+)"?/gm;
  const paramMatches = headerWithoutUri.matchAll(paramPattern);
  let params: StringDict = {};
  for (let match of paramMatches) {
    const [_, key, value] = match;
    params[key] = value;
  }

  return params;
}
