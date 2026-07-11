((shell) @injection.content
  (#set! injection.language "bash"))

(unary
  (function) @injection.content
  (pattern)
  (#match? @injection.content "^s")
  (#set! injection.language "perl"))

(binary
  (function) @_function
  (pattern) @injection.content
  (pattern)
  (#match? @_function "^m/.*r")
  (#set! injection.language "regex"))

(unary
  (function) @_function
  (pattern) @injection.content
  (#match? @_function "^C/.*r")
  (#set! injection.language "regex"))
