package tree_sitter_tmuxf_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_tmuxf "github.com/freed-wu/tree-sitter-tmux/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tmuxf.Language())
	if language == nil {
		t.Errorf("Error loading tmux format string grammar")
	}
}
