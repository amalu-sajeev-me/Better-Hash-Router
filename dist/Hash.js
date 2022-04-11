var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Hash_targetElement, _Hash_availableRouters, _Hash_showPage;
import { Template } from "./Template.js";
//  HASH CLASS ===>>
class Hash extends EventTarget {
    /**
     * new router constructor
     * @param {*} name
     */
    // Hash constructor method
    constructor(name) {
        super();
        this.name = name;
        // list of all routes created in a router instance
        this.routes = {};
        if (!Hash.isInitialized)
            throw new Error("Hash is not initialized");
        __classPrivateFieldGet(Hash, _a, "f", _Hash_availableRouters).push(this);
    }
    // getter for readonly availableRouters property
    static get availableRouters() {
        return __classPrivateFieldGet(this, _a, "f", _Hash_availableRouters);
    }
    // checks if a specified path exists in any of the routers
    static isRouteDefined(path) {
        for (let router of this.availableRouters)
            if (path in router.availableRoutes)
                return router;
        return false;
    }
    // removes the contents of the page
    static close() {
        __classPrivateFieldGet(this, _a, "f", _Hash_targetElement).innerHTML = "";
    }
    // initializes the library
    static initialize() {
        if (this.isInitialized)
            throw new Error("Already Initialized");
        window.addEventListener("load", __classPrivateFieldGet(this, _a, "m", _Hash_showPage).bind(this));
        window.addEventListener("hashchange", __classPrivateFieldGet(this, _a, "m", _Hash_showPage).bind(this));
        this.isInitialized = true;
        return this.isInitialized;
    }
    /**
     * adds new route information to the routes list
     * @param path
     * @param data
     * @return {Hash}
     *
     **/
    route(path, data) {
        if (Hash.isRouteDefined(path))
            throw new Error(`Route Handler for "${path}" is already defined`);
        if (!data)
            throw new Error("Invalid Data Recieved");
        this.parseRouteData(data).then((parsedData) => {
            const parsedEvent = new CustomEvent("doneparsing", {
                detail: { parsingPath: path },
            });
            const currentPath = location.hash.slice(1);
            this.routes[path] = parsedData;
            if (path === currentPath)
                this.open(path);
            this.dispatchEvent(parsedEvent);
        });
        return this;
    }
    /**
     * parse the route data into html string
     * @param data
     * @returns {Promise<any>}
     */
    parseRouteData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data === "string")
                return data;
            if (data.constructor.name === "Promise")
                return yield data;
            if (typeof data === "object" && "template" in data)
                return yield this.parseRouteData(yield this.fetchTemplate(data));
            if (typeof data === "object" && data instanceof HTMLElement)
                return data.outerHTML;
            if (typeof data === "function")
                return yield this.parseRouteData(data());
            throw new Error("Unknown data !");
        });
    }
    /**
     *
     * @param {ITemplateInit}
     * @returns {Promise<any>}
     */
    fetchTemplate({ template, selector }) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // getter method for available routes in a router instance
    get availableRoutes() {
        return this.routes;
    }
    /**
     * open a page with specified path if its exists
     * @param path
     */
    open(path) {
        if (!Hash.isRouteDefined(path))
            throw new Error("Invalid Path");
        const dialog = __classPrivateFieldGet(Hash, _a, "f", _Hash_targetElement);
        if (path in this.routes)
            dialog.innerHTML = this.routes[path];
        const openEvent = new CustomEvent("open", { detail: path });
        this.dispatchEvent(openEvent);
        return this;
    }
    /**
     * executes the callback function after the specified page is loaded into DOM
     * @param path
     * @param fn
     * @returns {Hash}
     */
    onPageLoad(path, fn) {
        this.addEventListener("open", (e) => {
            if (path === e.detail)
                fn(e);
        });
        return this;
    }
    /**
     * executes the callback function after the specified route is parsed
     * @param path
     * @param fn
     * @returns {Hash}
     */
    onReady(path, fn) {
        this.addEventListener("doneparsing", (e) => {
            if (path === e.detail.parsingPath)
                fn(e);
        });
        return this;
    }
}
_a = Hash, _Hash_showPage = function _Hash_showPage() {
    const { hash } = location;
    const path = location.href[location.href.length - 1] === "/" ? "/" : hash.slice(1);
    const routerAvailable = this.isRouteDefined(path);
    if (routerAvailable)
        return routerAvailable.open(path);
    const defaultRoute = this.isRouteDefined("/");
    if (defaultRoute)
        return defaultRoute.open("/"); // NEED TO UPDATE :BUG
};
// Hash binds to an HTMLElement to make routing possile.
_Hash_targetElement = { value: document.body };
// Array of all router instances
_Hash_availableRouters = { value: [] };
// status of library initialization
Hash.isInitialized = false;
// mapped object of already fetched templates
Hash.availableTemplates = new Map();
export default Hash;
export { Hash };
//# sourceMappingURL=Hash.js.map