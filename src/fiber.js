/**
 * Copyright (c) 2017-present, Fiber.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Fiber
 */
import Component from './isomorphic/component'
import createElement from './isomorphic/element';
import render from './renderers/render';

export default {
  createElement,
  Component,
  render
}

export {
  createElement,
  Component,
  render
}
