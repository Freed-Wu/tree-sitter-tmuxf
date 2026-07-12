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
  "%"
  "#"
] @punctuation.special

"=" @punctuation.assignment

"?" @operator

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
