declare type IRoute = {
    [key: string]: string;
};
declare type ITemplateInit = {
    template: string;
    selector: string;
};
interface IHash {
    name: string;
    routes: IRoute;
    route: (path: string, data: string | Function | HTMLElement) => IHash;
    open: (path: string) => IHash;
    parseRouteData: (data: string | HTMLElement | Function) => Promise<any>;
    fetchTemplate: ({ template, selector }: ITemplateInit) => Promise<any>;
    onPageLoad: (path: string, fn: Function) => IHash;
    onReady: (path: string, fn: Function) => IHash;
}
interface ITemplate {
    name: string;
    resourceUrl: string;
    selector?: string;
}
export { IHash, IRoute, ITemplateInit, ITemplate };
