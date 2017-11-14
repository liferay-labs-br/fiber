/**
 * Create element fiber with attributes and children's.
 * @param nodeName name the tag
 * @param attributes attributes that go through the tag
 * @param args arguments with children's tags
 * @return {object} return element a fiber.
 */
const createElement = (nodeName, attributes, ...args) => {
  let children = args.length ? [].concat(...args) : null;

  return { nodeName, attributes, children };
}

export default createElement;
