interface LinkHeader {
  // Link headers always contain a uri.
  uri: string;
  // Link headers can contain zero or more key/value parameters.
  [index: string]: string;
}
