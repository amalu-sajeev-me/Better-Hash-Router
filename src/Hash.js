import { isRequired } from "./utils.js";
import { Template } from "./Template.js";

//  HASH CLASS ===>>
class Hash extends EventTarget {
  // Hash binds to an HTMLElement to make routing possile.
  static #targetElement = document.body;

  // Array of all router instances
  static #availableRouters = [];

  // getter for readonly availableRouters property
  static get availableRouters() {
    return this.#availableRouters;
  }

  // checks if a specified path exists in any of the routers
  static isRouteDefined(path = isRequired("path")) {
    for (let router of this.availableRouters)
      if (path in router.availableRoutes) return router;
    return false;
  }

  // shows the pages on certain events
  static #showPage() {
    const { hash } = location;
    const path = location.href.at(-1) === "/" ? "/" : hash.slice(1);
    const defaultRoute = this.isRouteDefined("/");
    const routerAvailable = this.isRouteDefined(path);
    if (routerAvailable) return routerAvailable.open(path);
    else return defaultRoute.open("/"); // NEED TO UPDATE :BUG
    return false;
  }

  // removes the contents of the page
  static close() {
    this.#targetElement.innerHTML = "";
  }

  // initializes the library
  static initialize() {
    if (this.isInitialized) throw new Error("Already Initialized");
    window.addEventListener("load", this.#showPage.bind(this));
    window.addEventListener("hashchange", this.#showPage.bind(this));
    this.isInitialized = true;
    return this.isInitialized;
  }

  // status of library initialization
  static isInitialized = false;

  // mapped object of already fetched templates
  static availableTemplates = new Map();

  // list of all routes created in a router instance
  routes = {};

  /**
   *
   * @param {*} name
   */

  // Hash constructor method
  constructor(name = isRequired("name")) {
    if (!Hash.isInitialized) throw new Error("Hash is not initialized");
    super(name);
    this.name = name;
    Hash.#availableRouters.push(this);
  }

  // adds new route information to the routes list
  route(path = isRequired("path"), data = isRequired("data")) {
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

  // parse the route data into html string
  async parseRouteData(data) {
    if (typeof data === "string") return data;
    if (data.constructor.name === "Promise") return await data;
    if (typeof data === "object" && "template" in data)
      return await this.parseRouteData(await this.fetchTemplate(data));
    if (typeof data === "object" && data instanceof HTMLElement)
      return data.outerHTML;
    if (typeof data === "function") return await this.parseRouteData(data());
    throw new Error("Unknown data !");
  }

  // fetch a template from the specified html file and css selector
  async fetchTemplate(
    { template = null, selector = null } = isRequired("options")
  ) {
    if (!template)
      throw new Error("empty template not allowed. must specify the path");

    if (Hash.availableTemplates.has(template))
      return Hash.availableTemplates.get(template);

    return new Promise((resolve, reject) => {
      const htmlTemplate = new Template(this.name, template, selector);
      htmlTemplate.onReady(() => {
        resolve(htmlTemplate.html);
        Hash.availableTemplates.set(template, htmlTemplate.html);
      });
    });
  }

  // getter method for available routes in a router instance
  get availableRoutes() {
    return this.routes;
  }

  // open a page with specified path if its exists
  open(path = isRequired("path")) {
    if (!Hash.isRouteDefined(path)) throw new Error("Invalid Path");

    const dialog = Hash.#targetElement;
    if (path in this.routes) dialog.innerHTML = this.routes[path];

    const openEvent = new CustomEvent("open", { detail: path });
    this.dispatchEvent(openEvent);
  }

  // executes the callback function after the specified page is loaded into DOM
  onPageLoad(path, fn) {
    this.addEventListener("open", (e) => {
      if (path === e.detail) fn(e);
    });
    return this;
  }

  /* PROXY ==> */

  static router(name) {
    const Router = new Hash(name);
    const proxyHandler = {
      get(target, prop) {
        const property = target[prop];

        if (!prop in target) throw new Error(`${prop} property Not Found`);
        if (property.constructor.name === "Function")
          return property.bind(target);
        return property;
      },
      set() {
        throw new Error("Access Denied. Properties are read only");
      },
      has(target, prop) {
        return prop in target || prop in target.availableRoutes;
      },
    };
    return new Proxy(Router, proxyHandler);
  }
  /* */
}
const { router } = Hash;
export default Hash;
export { Hash, router };
