import { Component } from './component.js';

export default function createComponent(Constructor, props, context) {
  let instance;

  if (Constructor.prototype && Constructor.prototype.render) {
    instance = new Constructor(props, context);
    Component.call(instance, props, context, true);
    instance = instance.render();
  } else {
    instance = Constructor();
  }

  return instance;
}
