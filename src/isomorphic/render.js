import { buildComponentFromVNode } from './createComponent'

let initialVnode;

/**
 * Abstraction rule rendering and provide an
 * API to create any renderer on top of that.
 */
const renderFactory = (vnode, component, callback) => {
  initialVnode = vnode;

  if (isNullOrBoolean(vnode)) vnode = '';

	if (isString(vnode) || isNumber(vnode)) return callback(vnode);

	if (isFunction(vnode.nodeName)) {
		component = buildComponentFromVNode(vnode, {});
		vnode = component.vnode;
		component = component.instance;
	}

	if (isDef(vnode)) {
		vnode = initialVnode;
		vnode.nodeName = vnode.nodeName();
	};

  return callback({ vnode, component });
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
	if (typeof vnode === 'string') return true;
	return false;
}

/**
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isNumber = (vnode) => {
	if (typeof vnode === 'number') return true;
	return false;
}

/**
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isDef = (vnode) => {
	if (typeof vnode === 'undefined') return true;
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

export default renderFactory;
