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

  static #targetElement = new MarkupMaker("dialog", this.#targetElemOpts).html;

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
    else this.close();
    return false;
  }

  static close() {
    this.#targetElement.innerHTML = "";
    this.#targetElement.close();
  }

  static initialize() {
    if (this.isInitialized) throw new Error("Already Initialized");
    document.body.append(this.#targetElement);
    window.addEventListener("load", this.#showPage.bind(this));
    window.addEventListener("hashchange", this.#showPage.bind(this));
    this.isInitialized = true;
    return this.isInitialized;
  }

  static isInitialized = false;

  routes = {};

  /**
   *
   * @param {*} name
   */

  constructor(name) {
    if (!Hash.isInitialized) throw new Error("you must initialize first");
    super(name);
    this.name = name;
    Hash.#availableRouters.push(this);
  }

  route(path, data) {
    const routeData = this.parseRouteData(data);
    if (routeData.constructor.name === "Promise") {
      (async () => {
        const currentPath = location.hash.slice(1);
        const result = await routeData;
        this.routes[path] = this.parseRouteData(result);
        if (path === currentPath) this.open(path);
      })();
    } else this.routes[path] = this.parseRouteData(data);
    const routeEvent = new CustomEvent("route", { detail: path });
    this.dispatchEvent(routeEvent);
    return this;
  }

  parseRouteData(data) {
    if (typeof data === "string") return data;
    if (typeof data === "object" && "template" in data)
      return this.parseDataFromURL(data);
    if (typeof data === "object" && data instanceof HTMLElement)
      return data.outerHTML;
    if (typeof data === "object" && data instanceof MarkupMaker)
      return data.string;
    if (typeof data === "function")
      return this.parseRouteData(data(MarkupMaker));
    throw new Error("Unknown data !");
  }

  async parseDataFromURL({ template, element = null }) {
    const url = `${new URL(location.href).origin}/${template}`;
    const data = await fetch(url).then((res) => res.text());
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(data, "text/html");
    const outputHTML = element
      ? htmlDocument.querySelector(element)
      : htmlDocument.body;
    return outputHTML;
  }

  get availableRoutes() {
    return this.routes;
  }

  open(path) {
    const dialog = Hash.#targetElement;
    if (path in this.routes) dialog.innerHTML = this.routes[path];
    if (!dialog.open) dialog.open = true;
    const openEvent = new CustomEvent("open", { detail: path });
    this.dispatchEvent(openEvent);
  }

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
}

export { Hash };
