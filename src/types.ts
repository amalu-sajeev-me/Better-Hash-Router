import { Hash } from "./Hash";

type IRoute = { [key: string]: string };
type ITemplateInit = { template: string; selector: string };

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
