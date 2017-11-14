import updateQueue from './FiberUpdateQueue'

class Component {
  /**
   * Constructor
   * isMounted prevents the component call the componentWillMount() function
   * when the user use the constructor in his Fiber component
   */
  constructor(props, context, isMounted) {
    this.props = props;
    this.context = context;
    this.state = this.state || {};

    this.updater = updateQueue;

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

  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   * @param {object|function} state
   */
  setState(state) {
    this.state = Object.assign(this.state, typeof state === 'function' ? state(this.state, this.props) : state);

    this.updater.enqueueSetState(this, state);
  }

  render() {}
}

export default Component;
