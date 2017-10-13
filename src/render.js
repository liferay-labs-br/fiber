import { buildComponentFromVNode } from './component.js';

export default function render(vnode, parent) {
	if (vnode==null || typeof vnode==='boolean') vnode = '';

	if (typeof vnode==='string') return document.createTextNode(vnode);

  if (typeof vnode === 'function') vnode = vnode();

	if (typeof vnode.nodeName === 'function') vnode = buildComponentFromVNode(vnode, {});

  let n = document.createElement(vnode.nodeName);

  let a = vnode.attributes || {};
  Object.keys(a).forEach( k => n.setAttribute(k, a[k]) );

  (vnode.children || []).forEach( c => n.appendChild(render(c)) );

  if (parent) parent.appendChild(n);

  return n;
}
