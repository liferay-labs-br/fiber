import { buildComponentFromVNode } from './component.js';
import RenderUtils from './utils/render-utils';

let FiberComponent;

export default function render(vnode, parent) {
	
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode==='string') return document.createTextNode(vnode);
	
	if (typeof vnode.nodeName === 'function') {
		FiberComponent = buildComponentFromVNode(vnode, {});
		vnode = FiberComponent.vnode;
	}

	let node = document.createElement(vnode.nodeName);
	
	let attrs = vnode.attributes || {};
	
	let renderUtils = new RenderUtils(FiberComponent.instance, node, attrs);
	renderUtils.formatAttributes();

	(vnode.children || []).forEach( child => node.appendChild(render(child)) );
	
	if (parent) parent.appendChild(node);
	
	return node;
}
