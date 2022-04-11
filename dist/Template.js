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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Template_instances, _Template_templateFile, _Template_readFile, _Template_parseTemplate, _Template_parseQuery;
class Template extends EventTarget {
    // Template Construcor method
    constructor(name, resourceUrl, selector) {
        // calling parent constructor
        super();
        _Template_instances.add(this);
        // fetched template String
        _Template_templateFile.set(this, void 0);
        this.name = name;
        this.resourceUrl = resourceUrl;
        this.selector = selector;
        __classPrivateFieldGet(this, _Template_instances, "m", _Template_readFile).call(this).then((response) => {
            __classPrivateFieldSet(this, _Template_templateFile, __classPrivateFieldGet(this, _Template_instances, "m", _Template_parseTemplate).call(this, response), "f");
            const responseReady = new CustomEvent("ready");
            this.dispatchEvent(responseReady);
        });
    }
    // EventListener for template ready Event
    onReady(callback) {
        this.addEventListener("ready", callback);
        return this;
    }
    // getter for template html
    get html() {
        return __classPrivateFieldGet(this, _Template_templateFile, "f");
    }
}
_Template_templateFile = new WeakMap(), _Template_instances = new WeakSet(), _Template_readFile = function _Template_readFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${location.origin}/${this.resourceUrl}`);
        const headers = new Headers();
        headers.set("Content-Type", "text/html");
        const request = new Request(url.href, {
            method: "GET",
            headers,
            credentials: "include",
        });
        try {
            const response = yield fetch(request);
            if (response.ok)
                return yield response.text();
            if (response.status === 404)
                throw new Error(`Page Not Found`);
        }
        catch (e) {
            console.error(`couldn't fetch the template \n${e}`);
            if (e)
                return e.message;
        }
        return false;
    });
}, _Template_parseTemplate = function _Template_parseTemplate(templateString) {
    const htmlParser = new DOMParser();
    const htmlDoc = htmlParser.parseFromString(templateString, "text/html");
    const parsedElement = __classPrivateFieldGet(this, _Template_instances, "m", _Template_parseQuery).call(this, htmlDoc);
    const parsedElementData = parsedElement instanceof HTMLBodyElement
        ? parsedElement.innerHTML
        : parsedElement.outerHTML;
    // const fragment = new DocumentFragment();
    const wrapperElem = document.createElement("div");
    wrapperElem.innerHTML = parsedElementData;
    // fragment.appendChild(wrapperElem);
    const templateElement = wrapperElem;
    return templateElement.innerHTML;
}, _Template_parseQuery = function _Template_parseQuery(htmlDocument) {
    if (!(htmlDocument instanceof Document))
        throw new Error(`unknown input recieved`);
    const query = this.selector;
    const result = query
        ? htmlDocument.querySelector(query)
        : htmlDocument.body;
    if (!(result instanceof HTMLElement))
        throw new Error(`invalid query.\ncouldn't find ${query} element`);
    return result;
};
export { Template };
//# sourceMappingURL=Template.js.map