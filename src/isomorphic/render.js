/* @flow */

import { buildComponentFromVNode } from './createComponent'

let component;

type Vnode = {
  nodeName: string | ?void,
  attributes: Array<any> | void,
  children: string | Array<any> | void
};

/**
 * Abstraction rule rendering and provide an
 * API to create any renderer on top of that.
 */
const renderFactory = (vnode: Vnode, callback: Function): (Object | string) => {
  if (isNull(vnode) || isBoolean(vnode)) return callback('');

	if (isString(vnode) || isNumber(vnode)) return callback(vnode);

	if (isFunction(vnode.nodeName)) {
		component = buildComponentFromVNode(vnode, {});

    if (isNull(component.vnode)) {
			vnode.nodeName = undefined;
		} else {
			vnode = component.vnode;
		}

		component = component.instance;
	}

  return callback({ vnode, component });
}

/**
 * When the parameter is boolean it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isBoolean = (vnode: any): boolean => {
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
const isNull = (vnode: any): boolean => {
  if (vnode == null) return true;
  return false;
}

/**
 * When the parameter is string it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isString = (vnode: any): boolean => {
	if (typeof vnode === 'string') return true;
	return false;
}

/**
 * When the parameter is number it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isNumber = (vnode: any): boolean => {
	if (typeof vnode === 'number') return true;
	return false;
}

/**
 * When the parameter is function it returns true.
 * @param vnode
 * @return {boolean}
 * @internal
 */
const isFunction = (vnode: any): boolean => {
	if (typeof vnode === 'function') return true;
	return false;
}

export default renderFactory;
