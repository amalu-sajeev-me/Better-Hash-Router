import "global-jsdom/register";
import assert from "assert";

import { Hash } from "../dist/Hash.js";

describe("Hash", () => {
  before(() => {
    Hash.initialize();
  });

  it("This should initialize the library", () => {
    assert.strictEqual(Hash.isInitialized, true);
  });

  it("should add a new route", (done) => {
    const navigationRouter = new Hash("navigation");
    navigationRouter.route("/", "hello there!");
    setTimeout(() => {
      assert.strictEqual("/" in navigationRouter.availableRoutes, true);
      done();
    }, 10);
  });

  it("should accept data as a string", (done) => {
    const navigationRouter = new Hash("navigation");
    navigationRouter.route("string", "hello there!");
    setTimeout(() => {
      assert.strictEqual("string" in navigationRouter.availableRoutes, true);
      done();
    }, 10);
  });

  it("should accept data as an HTMLElement", (done) => {
    const navigationRouter = new Hash("navigation");
    const heading = document.createElement("h1");
    heading.innerHTML = "Hey, this is an h1 tag";
    navigationRouter.route("html", heading);
    setTimeout(() => {
      assert.strictEqual("html" in navigationRouter.availableRoutes, true);
      done();
    }, 10);
  });

  it("should accept data as a function", (done) => {
    const navigationRouter = new Hash("navigation");
    navigationRouter.route("function", () => "hey, i come from a function");
    setTimeout(() => {
      assert.strictEqual("function" in navigationRouter.availableRoutes, true);
      done();
    }, 10);
  });
});
