//  UTILS..

const isRequired = (param = null) => {
  throw new Error(`${param} parameter is required`);
};

export { isRequired };
