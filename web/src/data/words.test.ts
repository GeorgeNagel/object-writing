import { describe, it, expect } from "vitest";
import words from "./words.json";

describe("words.json", () => {
  it("is an array of at least 200 non-empty strings", () => {
    expect(Array.isArray(words)).toBe(true);
    expect(words.length).toBeGreaterThanOrEqual(200);
    for (const word of words) {
      expect(typeof word).toBe("string");
      expect(word.length).toBeGreaterThan(0);
    }
  });
});
