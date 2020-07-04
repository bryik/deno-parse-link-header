import {
  assertEquals,
} from "./deps.ts";
import { parseLinkHeader } from "./parseLinkHeader.ts";

Deno.test("with empty header", () => {
  const linkHeader = "";

  const actual = parseLinkHeader(linkHeader);
  const expected: [] = [];
  assertEquals(actual, expected);
});

Deno.test("parsing a proper link header with quoted parameters", () => {
  const linkHeader = `<https://example.com>; msg1="preconnect" msg2="hello"`;

  const actual = parseLinkHeader(linkHeader);
  const expected = [
    {
      uri: "https://example.com",
      msg1: "preconnect",
      msg2: "hello",
    },
  ];
  assertEquals(actual, expected);
});

Deno.test("parsing a proper link header with unquoted parameters", () => {
  const linkHeader = `<https://example.com>; msg1=preconnect msg2=hello`;

  const actual = parseLinkHeader(linkHeader);
  const expected = [
    {
      uri: "https://example.com",
      msg1: "preconnect",
      msg2: "hello",
    },
  ];
  assertEquals(actual, expected);
});

Deno.test("parsing a proper link header with both kinds of parameter encodings", () => {
  const linkHeader = `<https://example.com>; msg1="preconnect" msg2=hello`;

  const actual = parseLinkHeader(linkHeader);
  const expected = [
    {
      uri: "https://example.com",
      msg1: "preconnect",
      msg2: "hello",
    },
  ];
  assertEquals(actual, expected);
});

Deno.test("parsing multiple links", () => {
  const linkHeader =
    `<https://example.com>; msg1="preconnect" msg2=hello, <https://example.com>; msg1="preconnect" msg2=hello, <https://example.com>; msg1="preconnect" msg2=hello`;

  const actual = parseLinkHeader(linkHeader);
  const expected = [
    {
      uri: "https://example.com",
      msg1: "preconnect",
      msg2: "hello",
    },
    {
      uri: "https://example.com",
      msg1: "preconnect",
      msg2: "hello",
    },
    {
      uri: "https://example.com",
      msg1: "preconnect",
      msg2: "hello",
    },
  ];
  assertEquals(actual, expected);
});

Deno.test("parsing a proper link header that contains a comma in the uri", () => {
  const linkHeader =
    `<https://example.com/?query=oh,no>; msg1="preconnect" msg2=hello`;

  const actual = parseLinkHeader(linkHeader);
  const expected = [
    {
      uri: "https://example.com/?query=oh,no",
      msg1: "preconnect",
      msg2: "hello",
    },
  ];
  assertEquals(actual, expected);
});

Deno.test("parsing a proper link header that contains matrix parameters", () => {
  // This example is straight-up copied from thlorenz
  // https://github.com/thlorenz/parse-link-header/blob/master/test/parse-link-header.js#L174
  const linkHeader =
    `<https://imaginary.url.notreal/segment;foo=bar;baz/item?name=What,+me+worry>; rel="next";`;

  const actual = parseLinkHeader(linkHeader);
  const expected = [
    {
      uri:
        "https://imaginary.url.notreal/segment;foo=bar;baz/item?name=What,+me+worry",
      rel: "next",
    },
  ];
  assertEquals(actual, expected);
});
