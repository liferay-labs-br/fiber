import Component from './component';

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

const buildComponentFromVNode = (vnode, context) => {
  let props = getProps(vnode.attributes);

  return createComponent(vnode.nodeName, props, context);
}

const getProps = (attributes) => {
  return Object.assign({}, attributes);
}

export {
  buildComponentFromVNode,
  createComponent
};
