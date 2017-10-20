import createComponent from './component-lifecycle.js';

class Component {
	
  /**
   * Constructor
   * isMounted prevents the component call the componentWillMount() function
   * when the user use the constructor in his Fiber component
   */
  constructor(props, context, isMounted) {
    this.props = props;
    this.context = context;

    if (isMounted) {
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
