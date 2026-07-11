import XCTest
import SwiftTreeSitter
import TreeSitterTmuxf

final class TreeSitterTmuxfTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tmuxf())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading tmux format string grammar")
    }
}
