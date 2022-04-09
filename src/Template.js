import { isRequired } from "./utils.js";

class Template extends EventTarget {
  // fetched template String
  #templateFile;

  // Template Construcor method
  constructor(
    name = isRequired(`template name`),
    resourceUrl = isRequired(`resource url`),
    selector
  ) {
    // calling parent constructor
    super(name);

    this.resourceUrl = resourceUrl;
    this.selector = selector;

    this.#readFile().then((response) => {
      this.#templateFile = this.#parseTemplate(response);
      const responseReady = new CustomEvent("ready");
      this.dispatchEvent(responseReady);
    });
  }

  // read the contents of html file
  async #readFile() {
    const url = new URL(`${location.origin}/${this.resourceUrl}`);
    const headers = new Headers();

    headers.set("Content-Type", "text/html");

    const request = new Request(url, {
      method: "GET",
      headers,
      credentials: "include",
    });

    try {
      const response = await fetch(request);
      if (response.ok) return await response.text();
    } catch (e) {
      console.error(`couldn't fetch the template \n${e}`);
    }
    return false;
  }

  // parse an HTML Document from he fetched file
  #parseTemplate(templateString) {
    const htmlParser = new DOMParser();
    const htmlDoc = htmlParser.parseFromString(templateString, "text/html");
    const parsedElement = this.#parseQuery(htmlDoc);
    const parsedElementData =
      parsedElement instanceof HTMLBodyElement
        ? parsedElement.innerHTML
        : parsedElement.outerHTML;
    const fragment = new DocumentFragment();
    const wrapperElem = document.createElement("div");
    wrapperElem.innerHTML = parsedElementData;
    fragment.appendChild(wrapperElem);
    const templateElement = fragment.firstChild.innerHTML;
    return templateElement;
  }

  // parse the document to find the element specified in the query selector
  #parseQuery(htmlDocument) {
    if (!(htmlDocument instanceof Document))
      throw new Error(`unknown input recieved`);
    const query = this.selector;
    const result = query
      ? htmlDocument.querySelector(query)
      : htmlDocument.body;
    if (!(result instanceof HTMLElement))
      throw new Error(`invalid query.\ncouldn't find ${query} element`);
    return result;
  }

  // EventListener for template ready Event
  onReady(callback) {
    this.addEventListener("ready", callback);
    return this;
  }

  // getter for template html
  get html() {
    return this.#templateFile;
  }
}

export default Template;
export { Template };
