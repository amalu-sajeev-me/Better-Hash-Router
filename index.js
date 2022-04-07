import { MarkupMaker } from "./MarkupMaker.js";

class Hash extends EventTarget {
  static #targetElemStyles = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    border: "none",
    padding: "0",
    overflow: "scroll",
  };

  static #targetElemOpts = {
    styles: this.#targetElemStyles,
    attributes: { id: "dialog_wrapper" },
  };

  static #targetElement = document.body;

  static #availableRouters = [];

  static get availableRouters() {
    return this.#availableRouters;
  }

  static isRouteDefined(path) {
    for (let router of this.availableRouters)
      if (path in router.availableRoutes) return router;
    return false;
  }

  static #showPage() {
    const { hash } = location;
    const path = hash.slice(1);
    const routerAvailable = this.isRouteDefined(path);
    if (routerAvailable) return routerAvailable.open(path);
    return false;
  }

  static close() {
    this.#targetElement.innerHTML = "";
  }

  static initialize() {
    if (this.isInitialized) throw new Error("Already Initialized");
    window.addEventListener("load", this.#showPage.bind(this));
    window.addEventListener("hashchange", this.#showPage.bind(this));
    this.isInitialized = true;
    return this.isInitialized;
  }

  static isInitialized = false;
  static availableTemplates = new Map();

  routes = {};

  /**
   *
   * @param {*} name
   */

  constructor(name) {
    if (!Hash.isInitialized) Hash.initialize();
    super(name);
    this.name = name;
    Hash.#availableRouters.push(this);
  }

  route(path, data) {
    if (Hash.isRouteDefined(path))
      throw new Error(`Route Handler for "${path}" is already defined`);
    if (!data) throw new Error("Invalid Data Recieved");
    this.parseRouteData(data).then((parsedData) => {
      const parsedEvent = new CustomEvent("doneparsing", {
        detail: { parsingPath: path },
      });
      const currentPath = location.hash.slice(1);
      this.routes[path] = parsedData;
      if (path === currentPath) this.open(path);
      this.dispatchEvent(parsedEvent);
    });
    return this;
  }

  async parseRouteData(data) {
    if (typeof data === "string") return data;
    if (data.constructor.name === "Promise") return await data;
    if (typeof data === "object" && "template" in data)
      return await this.parseRouteData(await this.fetchTemplate(data));
    if (typeof data === "object" && data instanceof HTMLElement)
      return data.outerHTML;
    if (typeof data === "object" && data instanceof MarkupMaker)
      return data.string;
    if (typeof data === "function")
      return await this.parseRouteData(data(MarkupMaker));
    throw new Error("Unknown data !");
  }

  async fetchTemplate({ template = null, selector = null } = {}) {
    if (!template)
      throw new Error("empty template not allowed. must specify the path");

    if (Hash.availableTemplates.has(template))
      return Hash.availableTemplates.get(template);

    const url = `${new URL(location.href).origin}/${template}`;
    const htmlData = await fetch(url).then((response) => response.text());
    const htmlParser = new DOMParser();
    const templateDocument = htmlParser.parseFromString(htmlData, "text/html");

    const actualTemplate = selector
      ? templateDocument.querySelector(selector)
      : templateDocument.body;

    if (!actualTemplate instanceof HTMLElement)
      throw new Error("invalid template");

    const output =
      actualTemplate instanceof HTMLBodyElement
        ? actualTemplate.innerHTML
        : actualTemplate.outerHTML;

    Hash.availableTemplates.set(template, output);

    return output;
  }

  get availableRoutes() {
    return this.routes;
  }

  open(path) {
    if (!Hash.isRouteDefined(path)) throw new Error("Invalid Path");

    const dialog = Hash.#targetElement;
    if (path in this.routes) dialog.innerHTML = this.routes[path];

    const openEvent = new CustomEvent("open", { detail: path });
    this.dispatchEvent(openEvent);
  }

  onPageLoad(path, fn) {
    this.addEventListener("open", (e) => {
      if (path === e.detail) fn(e);
    });
  }

  /* PROXY ==> */

  static router(name) {
    const Router = new Hash(name);
    const extendedMethods = ["addEventListener", "dispatchEvent"];
    const proxyHandler = {
      get(target, prop) {
        const property = target[prop];
        if (extendedMethods.includes(prop)) return property.bind(target);
        if (prop in target) return target[prop];
        return false;
      },
      set() {
        throw new Error("Access Denied. Properties are read only");
      },
      has(target, prop) {
        return prop in target || prop in target.availableRoutes;
      },
    };
    const routerProxy = new Proxy(Router, proxyHandler);
    return routerProxy;
  }
  /* */
}
export default Hash;
export { Hash };
