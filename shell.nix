{
  pkgs ? import <nixpkgs> { },
}:

with pkgs;
mkShell {
  name = "tree-sitter-tmuxf";
  buildInputs = [
    tree-sitter
    bun
    cargo
    uv
  ];
}
