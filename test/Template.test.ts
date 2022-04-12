import "global-jsdom/register";
import assert from "assert";

describe("Template", () => {
  it("checks avilability of fetch", () => {
    assert.strictEqual("fetch" in window, true);
  });
});
