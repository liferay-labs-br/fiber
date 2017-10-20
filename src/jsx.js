export function jsx(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;

  return { nodeName, attributes, children };
}
