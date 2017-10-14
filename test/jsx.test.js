import jsx from '../src/jsx.js';

describe('jsx', () => {
  it('shound return a object', () => {
    let object = {
      nodeName: 'div',
      attributes: { id: 'app' },
      children: [ 'Hello World!' ]
    };

    expect(jsx('div', { id: 'app' }, 'Hello World!')).toEqual(object);
    expect(jsx('div', null)).toEqual({nodeName: 'div', attributes: null, children: null});
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

    expect(jsx('div', null, jsx('div', { id: 'app' }, 'Hello World!'))).toEqual(object);
  });
});
