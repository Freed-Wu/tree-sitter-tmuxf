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
    format: _ => /%./,
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
      /[g-zG-Z#,}]/,
    ),
    expansion: _ => seq(
      '#{',
      /[-_a-zA-Z]+/,
      '}',
    ),
    shell: _ => /[^)]+/,
    command: $ => seq(
      '#(',
      $.shell,
      ')',
    ),
    _syntax: $ => seq(alias(token.immediate(/[^],=]+/), $.key), optional(seq('=', alias(token.immediate(/[^],]+/), $.value)))),
    syntax: $ => seq(
      '#[',
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
      '#{?',
      repeat1(
        seq(
          $.condition,
          ',',
          $.pattern,
        )
      ),
      optional(seq(',', $.pattern)),
      '}',
    ),
    binary: $ => seq(
      '#{',
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
      '#{',
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
      '#{',
      $._unary,
      repeat(seq(';', $._unary)),
      token.immediate(':'),
      $.pattern,
      '}',
    ),
  }
});
