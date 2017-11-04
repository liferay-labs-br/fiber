import { buildComponentFromVNode } from './createComponent'

let component;

/**
 * Abstraction rule rendering and provide an
 * API to create any renderer on top of that.
 */
const renderFactory = (vnode, callback) => {
  if (isNullOrBoolean(vnode)) vnode = '';

	if (isString(vnode) || isNumber(vnode)) return callback(vnode);

	if (isFunction(vnode.nodeName)) {
		component = buildComponentFromVNode(vnode, {});

    if (isDef(component.vnode)) {
			vnode.nodeName = undefined;
		} else {
			vnode = component.vnode;
		}

		component = component.instance;
	}

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
