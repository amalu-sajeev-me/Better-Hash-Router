import { ITemplate } from "./types";
declare class Template extends EventTarget implements ITemplate {
    #private;
    name: string;
    resourceUrl: string;
    selector?: string | undefined;
    constructor(name: string, resourceUrl: string, selector: string);
    onReady(callback: () => void): this;
    get html(): string | undefined;
}
export { Template };
