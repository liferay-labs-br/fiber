import { Component } from './component.js';

export default function createComponent(Constructor, props, context) {
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
