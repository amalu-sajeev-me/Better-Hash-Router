import { IHash, IRoute, ITemplateInit } from "./types.js";
declare class Hash extends EventTarget implements IHash {
    #private;
    name: string;
    static isInitialized: boolean;
    static availableTemplates: Map<any, any>;
    static readonly EVENTS: {
        OPEN: string;
        READY: string;
        CLOSE: string;
        UNKNOWN: string;
        ERROR: string;
    };
    static get availableRouters(): Hash[];
    static isRouteDefined(path: string): Hash | false;
    static close(): void;
    static initialize(): boolean;
    routes: IRoute;
    /**
     * new router constructor
     * @param {*} name
     */
    constructor(name: string);
    /**
     * adds new route information to the routes list
     * @param path
     * @param data
     * @return {Hash}
     *
     **/
    route(path: string, data: string | Function | HTMLElement): IHash;
    /**
     * parse the route data into html string
     * @param data
     * @returns {Promise<any>}
     */
    parseRouteData(data: string | HTMLElement | Function): Promise<any>;
    /**
     * fetch a template from an html file
     * @param {ITemplateInit}
     * @returns {Promise<any>}
     */
    fetchTemplate({ template, selector }: ITemplateInit): Promise<any>;
    get availableRoutes(): IRoute;
    /**
     * open a page with specified path if its exists
     * @param path
     * @returns {Hash}
     */
    open(path: string): Hash;
    /**
     * executes the callback function after the specified page is loaded into DOM
     * @param path
     * @param fn
     * @returns {Hash}
     */
    onPageLoad(path: string, fn: Function): Hash;
    /**
     * executes the callback function after the specified route is parsed
     * @param path
     * @param fn
     * @returns {Hash}
     */
    onReady(path: string, fn: Function): Hash;
    /**
     *
     * @param fn
     * @returns {Hash}
     */
    onError(fn: Function): Hash;
}
export default Hash;
export { Hash };
