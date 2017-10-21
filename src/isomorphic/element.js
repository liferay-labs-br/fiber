const createElement = (nodeName, attributes, ...args) => {
  let children = args.length ? [].concat(...args) : null;

  return { nodeName, attributes, children };
}

export default createElement;
