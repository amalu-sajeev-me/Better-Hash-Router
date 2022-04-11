import { IRoute, ITemplateInit } from "./types.js";
declare class Hash extends EventTarget {
    #private;
    static get availableRouters(): Hash[];
    static isRouteDefined(path: string): Hash | false;
    static close(): void;
    static initialize(): boolean;
    static isInitialized: boolean;
    static availableTemplates: Map<any, any>;
    routes: IRoute;
    name: string;
    /**
     *
     * @param {*} name
     */
    constructor(name: string);
    route(path: string, data: string | Function | HTMLElement): this;
    parseRouteData(data: string | HTMLElement | Function): Promise<any>;
    fetchTemplate({ template, selector }: ITemplateInit): Promise<any>;
    get availableRoutes(): IRoute;
    open(path: string): void;
    onPageLoad(path: string, fn: Function): this;
    onReady(path: string, fn: Function): this;
}
export default Hash;
export { Hash };
