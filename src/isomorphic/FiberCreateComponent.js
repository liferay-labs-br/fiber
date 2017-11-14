import Component from './FiberComponent';

/**
 * Create the Fiber Component when constructor is a class
 * and passing the props and context for component.
 * @param Constructor
 * @param props
 * @param context
 * @return {object} return with one instance of the component and vnode.
 * @internal
 */
const createComponent = (Constructor, props, context) => {
  let instance, vnode;

  if (Constructor.prototype && Constructor.prototype.render) {
    instance = new Constructor(props, context);
    Component.call(instance, props, context, true);
    vnode = instance.render();
  } else {
    instance = vnode = Constructor(props);
  }

  return {instance, vnode};
}

/**
 * Mount component passing the vnode, props and context.
 * @param vnode
 * @param context
 * @return {object} return with one instance of the component and vnode.
 * @internal
 */
const buildComponentFromVNode = (vnode, context) => {
  let props = getProps(vnode.attributes);

  return createComponent(vnode.nodeName, props, context);
}

/**
 * @param attributes
 * @return {object}
 * @internal
 */
const getProps = (attributes) => {
  return Object.assign({}, attributes);
}

export {
  buildComponentFromVNode,
  createComponent
};
