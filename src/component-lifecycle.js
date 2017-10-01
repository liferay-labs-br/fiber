import Component from './component.js';

export default function createComponent(Ctor, props, context) {
  let inst;

  if (Ctor.prototype && Ctor.prototype.render) {
    inst = new Ctor(props, context);
    Component.call(inst, props, context);
  } else {
    inst = new Component(props, context);
    inst.constructor = Ctor;
    inst.render = doRender;
  }

  return Ctor.prototype.render;
}

function doRender(props, state, context) {
  return this.constructor(props, context);
}
