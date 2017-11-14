/**
 * This is the abstract API for an update queue.
 */
const updateQueue = {
  /**
   * @param {FiberClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: (publicInstance, partialState) => {},
}

export default updateQueue;
