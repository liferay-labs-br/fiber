import { renderFactory } from '../../isomorphic/fiber';
import { addEventListener, isEvent } from './events';

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

export default render;
