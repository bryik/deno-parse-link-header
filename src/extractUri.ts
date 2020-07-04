/**
 * Extracts the uri from a link header.
 * @param header For example: `<https://example.com>; msg1="preconnect" msg2=hello`
 * @returns null or the uri (e.g. "https://example.com")
 */
export function extractUri(header: string): (null | string) {
  // Extract uri.
  // The uri is always between '<' '>'
  const uriPattern = /<(.+)>/m;
  const uriMatch = uriPattern.exec(header);
  if (uriMatch === null) {
    return null;
  }
  const uri = uriMatch[1];

  return uri;
}
