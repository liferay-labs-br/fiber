import createComponent from './component-lifecycle.js';

class Component {
  constructor(props, context, isMount) {
    this.props = props;
    this.context = context;

    if (isMount) {
      this.componentWillMount();
    }
  }

  /**
   * Lifecycle
   * Corresponds created()
   */
  componentWillMount() {}

  /**
   * Lifecycle
   * Corresponds disposed()
   */
  componentWillUnmount() {}

  /**
   * Lifecycle
   * Corresponds shouldUpdate()
   */
  shouldComponentUpdate() {}

  /**
   * Lifecycle
   * Corresponds rendered()
   */
  componentDidUpdate() {}

  setState(state, callback) {}

  render() {}
}

const buildComponentFromVNode = (vnode, context) => {
  let props = Object.assign({}, vnode.attributes);
  return createComponent(vnode.nodeName, props, context);
}

export {
  Component,
  buildComponentFromVNode
}
