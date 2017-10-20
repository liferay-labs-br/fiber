import { buildComponentFromVNode } from './component.js';
import renderUtils from './utils/render-utils';

export default function render(vnode, parent) {
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode==='string') return document.createTextNode(vnode);
	
	if (typeof vnode === 'function') vnode = vnode();

	if (typeof vnode.nodeName === 'function') vnode = buildComponentFromVNode(vnode, {});
	
	let node = document.createElement(vnode.nodeName);
	
	let attributes = vnode.attributes || {};
	renderUtils._formatAttributes(node, attributes);
	
	(vnode.children || []).forEach( child => node.appendChild(render(child)) );
	
	if (parent) parent.appendChild(node);
	
	return node;
}
