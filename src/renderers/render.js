import { buildComponentFromVNode } from '../isomorphic/createComponent';

let component;

/**
 * @public
 * @param vnode
 * @param parent
 */
const render = (vnode, parent) => {
	if (isNullOrBoolean(vnode)) return '';

	if (isString(vnode)) return document.createTextNode(vnode);

	if (isFunction(vnode.nodeName)) {
		component = buildComponentFromVNode(vnode, {});
		vnode = component.vnode;
	}

	let node = document.createElement(vnode.nodeName);

	let attributes = vnode.attributes || {};

	setAttributes(component.instance, node, attributes);

	(vnode.children || []).forEach( child => node.appendChild(render(child)) );

	if (parent) parent.appendChild(node);

	return node;
}

/**
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isNullOrBoolean = (vnode) => {
	if (vnode == null || typeof vnode === 'boolean') return true;
	return false;
}

/**
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isString = (vnode) => {
	if (typeof vnode==='string') return true;
	return false;
}

/**
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isFunction = (vnode) => {
	if (typeof vnode === 'function') return true;
	return false;
}

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
