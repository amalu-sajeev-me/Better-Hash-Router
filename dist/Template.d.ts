import { ITemplate } from "./types";
declare class Template extends EventTarget implements ITemplate {
    #private;
    name: string;
    resourceUrl: string;
    selector?: string | undefined;
    /**
     * Template Construcor method
     * @param name
     * @param resourceUrl
     * @param selector
     */
    constructor(name: string, resourceUrl: string, selector?: string | undefined);
    /**
     * EventListener for template ready Event
     * @param callback
     * @returns
     */
    onReady(callback: () => void): this;
    /**
     *
     * @param callback
     * @returns
     */
    onFailure(callback: () => void): this;
    /**
     *
     * @param event
     * @param callback
     * @returns
     */
    on(event: string, callback: () => void): this;
    /**
     * getter for template html
     */
    get html(): string | undefined;
}
export default Template;
export { Template };
