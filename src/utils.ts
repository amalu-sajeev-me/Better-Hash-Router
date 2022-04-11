//  UTILS..

const isRequired = (param: string): never => {
  throw new Error(`${param} parameter is required`);
};

export { isRequired };
