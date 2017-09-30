export default function render(vnode, parent) {
	if (typeof vnode==='string') return document.createTextNode(vnode);

  let n = document.createElement(vnode.nodeName);

  let a = vnode.attributes || {};
  Object.keys(a).forEach( k => n.setAttribute(k, a[k]) );

  (vnode.children || []).forEach( c => n.appendChild(render(c)) );

  parent.appendChild(n);

  return n;
}
