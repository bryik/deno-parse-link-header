# `deno-parse-link-header`

This is a Deno module for parsing HTTP Link headers.

Yes, [there are already a number of Node.js packages for parsing link headers](https://www.npmjs.com/search?q=parse%20link%20header); this module was mostly an excuse for me to try Deno and learn a little about a somewhat obscure HTTP header.

## usage

Use in Deno:

```js
import { parseLinkHeader } from "https://cdn.jsdelivr.net/gh/bryik/deno-parse-link-header@v0.1.1/parseLinkHeader.ts";

const example = `<https://example.com>; msg1="preconnect" msg2=hello`;

const parsedLinkHeader = parseLinkHeader(example);

console.log(parsedLinkHeader);
// [{uri: "https://example.com", msg1: "preconnect", msg2: "hello"}]
```

Use in browser (import the ES Module `/dist/parseLinkHeader.bundle.js`):

```html
<script type="module">
  import { parseLinkHeader } from "https://cdn.jsdelivr.net/gh/bryik/deno-parse-link-header@v0.1.1/dist/parseLinkHeader.bundle.js";

  const linkHeader = `<https://example.com>; msg1="preconnect" msg2="hello"`;
  console.log(parseLinkHeader(linkHeader));
  // [{uri: "https://example.com", msg1: "preconnect", msg2: "hello"}]
</script>
```

## development

First clone this repo and `cd` into it. You will need to have [deno](https://deno.land/) installed.

### installation

```bash
deno cache --reload --lock=lock.json ./deps.ts
```

### updating lock file

```bash
deno cache --lock=lock.json --lock-write ./deps.ts
```

### running tests

```bash
deno test
```

### building `/dist`

```bash
deno bundle ./parseLinkHeader.ts ./dist/parseLinkHeader.bundle.js
```

## resources

- MDN's article on [Link headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) provides a concise description of what a Link header is.

- thlorenz' [parse-link-header](https://github.com/thlorenz/parse-link-header) node package was a useful reference and I re-used many of his test cases.

- Section 3 of [RFC 8288](https://tools.ietf.org/html/rfc8288#section-3) is the definitive specification for Link headers. It is very dry.
