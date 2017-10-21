const createElement = (nodeName, attributes, ...args) => {
  let children, i;

  for(i = 0; i < args.length; i++) {
    if (typeof args[i] === 'number') args[i] = String(args[i]);
  }

  children = args.length ? [].concat(...args) : null;

  return { nodeName, attributes, children };
}

export default createElement;
