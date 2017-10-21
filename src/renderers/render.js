import { buildComponentFromVNode } from './fiber';

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
 * @private
 * @param vnode
 * @return {boolean}
 */
const isNullOrBoolean = (vnode) => {
	if (vnode == null || typeof vnode === 'boolean') return true;
	return false;
}

/**
 * @private
 * @param vnode
 * @return {boolean}
 */
const isString = (vnode) => {
	if (typeof vnode==='string') return true;
	return false;
}

/**
 * @private
 * @param vnode
 * @return {boolean}
 */
const isFunction = (vnode) => {
	if (typeof vnode === 'function') return true;
	return false;
}

/**
 * @private
 * @param component
 * @param node
 * @param attributes
 */
const setAttributes = (component, node, attributes) => {
	Object.keys(attributes).forEach(attr => {
		if (attributes[attr] === 'null' || attributes[attr] === 'undefined' || !attributes[attr]) return;

		if (isEvent(attr)) return addEventListener(component, node, attr, attributes);

		node.setAttribute(attr, attributes[attr]);
	});
}

/**
 * @private
 * @param component
 * @param node
 * @param attr
 * @param attributes
 */
const addEventListener = (component, node, attr, attributes) => {
	let eventName = extractEventName(attr);

	node.addEventListener(eventName, attributes[attr].bind(component));
}

/**
 * @private
 * @param attr
 * @return {boolean}
 */
const isEvent = (attr) => {
	return /^on/.test(attr);
}

/**
 * @private
 * @param attr
 * @return {string}
 */
const extractEventName = (attr) => {
	return attr.slice('2').toLowerCase();
}

export default render;
