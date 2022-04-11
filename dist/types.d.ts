import { Hash } from "./Hash";
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
    open(path: string): Hash;
}
interface ITemplate {
    name: string;
    resourceUrl: string;
    selector?: string;
}
export { IHash, IRoute, ITemplateInit, ITemplate };
