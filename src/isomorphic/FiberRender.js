import { buildComponentFromVNode } from './FiberCreateComponent'

let component;

/**
 * Abstraction rule rendering and provide an
 * API to create any renderer on top of that.
 */
const renderFactory = (vnode, {createInstance, createTextNode}) => {
	if (isNull(vnode) || isBoolean(vnode)) vnode = '';

	if (isString(vnode) || isNumber(vnode)) return createTextNode(vnode);

	if (isFunction(vnode.nodeName)) {
		component = buildComponentFromVNode(vnode, {});

    if (isNull(component.vnode)) {
			vnode.nodeName = undefined;
		} else {
			vnode = component.vnode;
		}

		component = component.instance;
	}

	return createInstance(vnode, component);
};

/**
 * When the parameter is boolean it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isBoolean = (vnode) => {
	if (typeof vnode === 'boolean') return true;
	return false;
}

/**
 * When the parameter is null or undefined it returns true,
 * this is because of the `==` comparator that activates coercion.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isNull = (vnode) => {
  if (vnode == null) return true;
  return false;
}

/**
 * When the parameter is string it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isString = (vnode) => {
	if (typeof vnode === 'string') return true;
	return false;
}

/**
 * When the parameter is number it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isNumber = (vnode) => {
	if (typeof vnode === 'number') return true;
	return false;
}

/**
 * When the parameter is function it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isFunction = (vnode) => {
	if (typeof vnode === 'function') return true;
	return false;
}

export default renderFactory;
