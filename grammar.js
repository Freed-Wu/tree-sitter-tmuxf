/**
 * @file 🌲👨 tmux format ststring grammar for tree-sitter 
 * @author Wu <wuzhenyu@ustc.edu>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "tmuxf",

  rules: {
    pattern: $ => repeat1(
      choice(
        $._character,
        $.format,
        $.variable,
        $.command,
        $.syntax,
      ),
    ),
    _character: _ => token.immediate(/[^#%,}]/),
    format: _ => seq(
      '%',
      token.immediate(/./),
    ),
    variable: $ => choice(
      $.simple_expansion,
      $.expansion,
      $.rgb,
      $.if,
      $.binary,
      $.logic,
      $.unary,
    ),

    simple_expansion: _ => seq(
      '#',
      token.immediate(/[g-zG-Z#,}]/),
    ),
    expansion: _ => seq(
      '#',
      token.immediate('{'),
      /[-_a-zA-Z]+/,
      '}',
    ),
    shell: _ => /[^)]+/,
    command: $ => seq(
      '#',
      token.immediate('('),
      $.shell,
      ')',
    ),
    _syntax: $ => seq(alias(token.immediate(/[^],=]+/), $.key), optional(seq('=', alias(token.immediate(/[^],]+/), $.value)))),
    syntax: $ => seq(
      '#',
      token.immediate('['),
      $._syntax,
      repeat(seq(',', $._syntax)),
      ']',
    ),
    rgb: _ => seq(
      '#',
      token.immediate(/[\dA-Fa-f]{6}/),
    ),
    condition: _ => /[^#,}]+/,
    if: $ => seq(
      '#',
      token.immediate('{'),
      token.immediate('?'),
      repeat1(
        seq(
          $.condition,
          ',',
          optional($.pattern),
        )
      ),
      optional(seq(',', optional($.pattern))),
      '}',
    ),
    binary: $ => seq(
      '#',
      token.immediate('{'),
      alias(
        choice(
          token.immediate(choice('==', '!=', '<', '>', '<=', '>=', 'R', /m[^:]*/)),
          seq(
            token.immediate('e'),
            repeat(seq(
              '|', /[^|:%]|\d+|%%/
            )),
          )
        ), $.function),
      token.immediate(':'),
      $.pattern,
      ',',
      $.pattern,
      '}',
    ),
    logic: $ => seq(
      '#',
      token.immediate('{'),
      alias(token.immediate(choice('||', '&&')), $.function),
      token.immediate(':'),
      repeat1(
        seq(
          $.pattern,
          ',',
        )
      ),
      $.pattern,
      '}',
    ),
    _unary: $ => alias(seq(
      token.immediate(choice('!!', '!', /[a-df-ln-zA-OS-Z][^a-zA-Z:;][^:;]*/,)),
    ), $.function),
    unary: $ => seq(
      '#',
      token.immediate('{'),
      $._unary,
      repeat(seq(';', $._unary)),
      token.immediate(':'),
      $.pattern,
      '}',
    ),
  }
});
