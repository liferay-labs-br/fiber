export default function render(vNode) {
  if (vNode.split) return document.createTextNode(vNode);

  console.log(vNode);

  let n = document.createElement(vNode.nodeName);

  let a = vNode.attributes || {};
  Objects.keys(a).forEach(k => n.setAttribute(k, a[k]));

  (vNode.children || []).forEach( c => n.appendChild(render(c)));

  //if (parent && n.parentNode!==parent) parent.appendChild(n);

  return n;
}
