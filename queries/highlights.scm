[
  "{"
  "}"
  "("
  ")"
  "["
  "]"
] @punctuation.bracket

[
  ","
  ";"
  ":"
] @punctuation.delimiter

[
  "@"
  "%"
  "#"
] @punctuation.special

[
  "="
  "?"
] @operator

(identifier) @variable

[
  (format)
  (simple_expansion)
  (expansion)
  (rgb)
  (condition)
  (key)
] @property

(value) @constant

(function) @function.call
