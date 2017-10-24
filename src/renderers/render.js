import renderFactory from '../isomorphic/render';

/**
 * @public
 * @param vnode
 * @param parent
 */
const render = (vnode, parent) => {
	let node = irender(vnode);

	if (node.nodeName !== 'UNDEFINED' && parent) parent.appendChild(node);

	return node;
}

/**
 * Internal of render.
 */
const irender = (vnode) =>
	renderFactory(vnode, (args) => {
		if (typeof args === 'object') {
			let { vnode, component } = args;
			let node = document.createElement(vnode.nodeName);
			let attributes = vnode.attributes || {};

			setAttributes(component, node, attributes);

			(vnode.children || []).forEach( child => node.appendChild(render(child)) );

			return node;
		}

		return document.createTextNode(args)
	});

/**
 * @param component
 * @param node
 * @param attributes
 * @internal
 */
const setAttributes = (component, node, attributes) => {
	Object.keys(attributes).forEach(attr => {
		if (attributes[attr] === 'null' || attributes[attr] === 'undefined' || !attributes[attr]) return;

		if (isEvent(attr)) return addEventListener(component, node, attr, attributes);

		node.setAttribute(attr, attributes[attr]);
	});
}

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

export default render;
