/**
 * @param component
 * @param node
 * @param attr
 * @param attributes
 * @internal
 */
const addEventListener = (component, node, attr, attributes) => {
	let eventName = extractEventName(attr);

	node.addEventListener(eventName, attributes[attr].bind(component));
}

/**
 * @param attr
 * @return {boolean}
 * @internal
 */
const isEvent = (attr) => {
	return /^on/.test(attr);
}

/**
 * @param attr
 * @return {string}
 * @internal
 */
const extractEventName = (attr) => {
	return attr.slice('2').toLowerCase();
}

export {
  addEventListener,
  isEvent
}
