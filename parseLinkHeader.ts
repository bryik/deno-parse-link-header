import { LinkHeader } from "./src/LinkHeader.ts";
import { extractLinks } from "./src/extractLinks.ts";
import { extractUri } from "./src/extractUri.ts";
import { extractParameters } from "./src/extractParameters.ts";

/**
 * Parses out uri and parameters from a **single** Link header string.
 * @param header For example: `<https://example.com>; msg1="preconnect" msg2=hello`
 * @returns e.g. {uri: "https://example.com", msg1: "preconnect", msg2: "hello"},
 */
function parseOneLinkHeader(header: string): LinkHeader {
  const uri = extractUri(header);
  const parameters = extractParameters(header);

  return { uri, ...parameters };
}

/**
 * Parses a Link header into an array of objects.
 * @param header for example `<https://example.com>; msg1="preconnect" msg2=hello, <https://another-example.com>; msg3=wow`
 * @returns e.g.
 *  [
 *    {uri: "https://example.com", msg1: "preconnect", msg2: "hello"},
 *    {uri: "https://another-example.com", msg3: "wow"}
 *  ]
 */
export function parseLinkHeader(header: string): LinkHeader[] {
  if (header === "") {
    return [];
  }

  // Break into separate Link headers.
  const linkHeaders = extractLinks(header);

  // Parse each Link header.
  const parsedLinks = linkHeaders.map(parseOneLinkHeader);

  return parsedLinks;
}
