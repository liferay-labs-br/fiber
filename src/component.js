import createComponent from './component-lifecycle.js';

export default class Component {
  constructor(props, context) {
    this.context = context;
    this.props = props;
    this.state = this.state || {};
  }

  setState(state, callback) {
    let s = this.state;
    if (!this.prevState) this.prevState = extend({}, s);
    extend(s, typeof state === 'function' ? state(s, this.props) : state);
    if (callback) (this._renderCallbacks = (this._renderCallbacks || [])).push(callback);
    // causa a rerenderização
  }

  render() {}
}

export function buildComponentFromVNode(vnode, context) {
  let props = getNodeProps(vnode);

  createComponent(vnode.nodeName, props, context);
}

function getNodeProps(vnode) {
	let props = extend({}, vnode.attributes);
	props.children = vnode.children;

	return props;
}

function extend(obj, props) {
	for (let i in props) obj[i] = props[i];
	return obj;
}
