import { ITemplate } from "./types";
class Template extends EventTarget implements ITemplate {
  // fetched template String
  #templateFile?: string;

  /**
   * Template Construcor method
   * @param name
   * @param resourceUrl
   * @param selector
   */
  constructor(
    public name: string,
    public resourceUrl: string,
    public selector?: string
  ) {
    super();

    this.#readFile().then((response) => {
      this.#templateFile = this.#parseTemplate(response);
      const responseReady = new CustomEvent("ready");
      this.dispatchEvent(responseReady);
    });
  }

  /**
   * read the contents of html file
   * @returns {Promise<any>}
   */
  async #readFile(): Promise<any> {
    const url = new URL(`${location.origin}/${this.resourceUrl}`);
    const headers = new Headers();

    headers.set("Content-Type", "text/html");

    const request = new Request(url.href, {
      method: "GET",
      headers,
      credentials: "include",
    });

    try {
      const response = await fetch(request);
      if (response.ok) return await response.text();
      if (response.status === 404) throw new Error(`Page Not Found`);
    } catch (e: any) {
      console.error(`couldn't fetch the template \n${e}`);
      if (e) return e.message;
    }
    return false;
  }

  /**
   * parse an HTML Document from the fetched file
   * @param templateString
   * @returns
   */
  #parseTemplate(templateString: string) {
    const htmlParser = new DOMParser();
    const htmlDoc = htmlParser.parseFromString(templateString, "text/html");
    const parsedElement = this.#parseQuery(htmlDoc);
    const parsedElementData =
      parsedElement instanceof HTMLBodyElement
        ? parsedElement.innerHTML
        : parsedElement.outerHTML;

    const wrapperElem = document.createElement("div");
    wrapperElem.innerHTML = parsedElementData;

    const templateElement: HTMLElement = wrapperElem;
    return templateElement.innerHTML;
  }

  /**
   * parse the document to find the element specified in the query selector
   * @param htmlDocument
   * @returns
   */
  #parseQuery(htmlDocument: Document) {
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

  /**
   * EventListener for template ready Event
   * @param callback
   * @returns
   */
  onReady(callback: () => void) {
    this.addEventListener("ready", callback);
    return this;
  }

  /**
   * getter for template html
   */
  get html(): string | undefined {
    return this.#templateFile;
  }
}

export default Template;
export { Template };
