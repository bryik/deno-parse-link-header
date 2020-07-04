/**
 * Splits a string containing one or more Link headers into an array of Link headers.
 * @param header For example: `<https://example.com>; msg1="preconnect" msg2=hello, <https://another-example...`
 * @returns e.g. ["<https://example...", "<https://another..."]
 */
export function extractLinks(header: string): string[] {
  if (header === "") {
    return [];
  }

  // Break into separate links.
  const linksPattern = /,?\s</gm;
  let links = header.split(linksPattern);
  // The split removes '<' from all but the first link. Add these back.
  links = links.map((link, index) => {
    if (index > 0) {
      return "<" + link;
    }
    return link;
  });
  // ["<https://example...", "<https://another..."]

  return links;
}
