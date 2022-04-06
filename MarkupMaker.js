class MarkupMaker {
  constructor(
    type,
    { props = {}, styles = {} } = {},
    parentElem = null,
    children = []
  ) {
    this.element = document.createElement(type);
    this.parentElem = parentElem;
    this.children = children;
    this.props = props;
    this.styles = styles;
  }
  #formatElement() {
    const { element, parentElem, children, props, styles } = this;
    if (parentElem && parentElem instanceof HTMLElement)
      parentElem.append(element);
    if (!Array.isArray(children)) {
      if (typeof children === "string") element.innerHTML = children;
      else
        throw new Error("children must be passed as an array of HTMLElements");
    } else children.length > 0 && element.append(...children);
    if (typeof props !== "object") throw new Error("props must be an Object");
    for (let prop in props) element.setAttribute(prop, props[prop]);
    if (styles) Object.assign(element.style, styles);
    return element;
  }

  addProps(props) {
    if (typeof props === "object")
      for (let prop in props) this.element.setAttribute(prop, props[prop]);
    else this.element.setAttribute(...arguments);
    return this;
  }

  on(event, callBackFn) {
    this.element.addEventListener(event, callBackFn);
    return this;
  }

  get html() {
    return this.#formatElement();
  }
  get string() {
    return this.html.outerHTML;
  }
  addClass(values) {
    if (Array.isArray(values))
      for (let value of values) this.element.classList.add(value);
    else this.element.classList.add(values);
    return this;
  }

  static makeElement(type, options) {
    const element = new MarkupMaker(type, options);
    const proxyTraps = {
      get(target, prop) {
        if (prop in target) return target[prop];
        else throw new Error("trying to access unknown property");
      },
    };
    const elementProxy = new Proxy(element, proxyTraps);
    return elementProxy;
  }
}

export { MarkupMaker };
