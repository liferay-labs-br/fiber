import { createElement } from '../src/Fiber.js';

describe('createElement', () => {
  it('shound return a object', () => {
    let object = {
      nodeName: 'div',
      attributes: { id: 'app' },
      children: [ 'Hello World!' ]
    };

    expect(createElement('div', { id: 'app' }, 'Hello World!')).toEqual(object);
    expect(createElement('div', null)).toEqual({nodeName: 'div', attributes: null, children: null});
  });

  it('should support element children', () => {
    let object = {
      nodeName: 'div',
      attributes: null,
      children: [
        {
          nodeName: 'div',
          attributes: { id: 'app' },
          children: [ 'Hello World!' ]
        }
      ]
    };

    expect(createElement('div', null, createElement('div', { id: 'app' }, 'Hello World!'))).toEqual(object);
  });
});
