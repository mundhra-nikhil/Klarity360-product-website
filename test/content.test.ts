import assert from "assert";
import { extractHeadingsFromMdx } from "../lib/data/docs/content";

describe("extractHeadingsFromMdx", () => {
  it("should extract headings and assign unique and clean IDs", () => {
    const input = "## Heading 1\nsome content\n## Heading 2";
    const result = extractHeadingsFromMdx(input);
    
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].text, "Heading 1");
    assert.strictEqual(result[0].id, "heading-1");
    assert.strictEqual(result[1].text, "Heading 2");
    assert.strictEqual(result[1].id, "heading-2");
  });

  it("should handle duplicate heading text by appending numeric counters", () => {
    const input = "## Duplicate\n## Duplicate";
    const result = extractHeadingsFromMdx(input);
    
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].id, "duplicate");
    assert.strictEqual(result[1].id, "duplicate-1");
  });
});
