import { render, createElement, Component } from '../src/Fiber';

let Bar, Foo;

describe('render', () => {
  let artboard;

  beforeAll(() => {
    artboard = document.createElement('div');
		(document.body || document.documentElement).appendChild(artboard);
  });

  beforeEach(() => {
    artboard.innerHTML = '';
  });

  afterAll(() => {
    artboard.parentNode.removeChild(artboard);
		artboard = null;

    if (Bar) {
      Bar.dispose();
    }

    if (Foo) {
      Foo.dispose();
    }
  });

  it('should not render when render of the class return empty', () => {
    class Bar extends Component {
      render() {
        return;
      }
    }

    render(<Bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when render of the class return bool false', () => {
    class Bar extends Component {
      render() {
        return false;
      }
    }

    render(<Bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when render of the class return bool true', () => {
    class Bar extends Component {
      render() {
        return true;
      }
    }

    render(<Bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when render of the class return string', () => {
    class Bar extends Component {
      render() {
        return 'Foo bar';
      }
    }

    render(<Bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when render of the class return undefined', () => {
    class Bar extends Component {
      render() {
        return undefined;
      }
    }

    render(<Bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should render class with nested children', () => {
    class Bar extends Component {
      render() {
        return (
          <div id="App">
            <div>
              <h1>Hello World!</h1>
              <p>foo <span>bar</span></p>
            </div>
          </div>
        );
      }
    }

    render(<Bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render the onClick event', () => {
    class Bar extends Component {
      click() {}

      render() {
        return (
          <div onClick={this.click} id="app">Foo bar</div>
        );
      }
    }

    render(<Bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });
});
