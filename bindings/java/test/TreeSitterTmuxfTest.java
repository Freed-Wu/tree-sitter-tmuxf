import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.tmuxf.TreeSitterTmuxf;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterTmuxfTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterTmuxf.language()));
    }
}
