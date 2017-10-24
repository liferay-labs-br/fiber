import { render, createElement } from '../src/fiber';

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
  });

  it('should create empty node <div />', () => {
    render(<div />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should create empty node <p />', () => {
    render(<p />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should create empty nodes <foo /> and <bar>', () => {
    render(<foo />, artboard);
    render(<bar />, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should nest empty nodes', () => {
    render((
      <div>
        <p />
        <foo />
        <bar />
      </div>
    ), artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render falsey values', () => {
    render((
      <div>
        {null}{undefined}{false}{0}{NaN}
      </div>
    ), artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render null', () => {
    render(null, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render undefined', () => {
    render(undefined, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render boolean true', () => {
    render(true, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render boolean false', () => {
    render(false, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should render NaN as text content', () => {
    render(NaN, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should render numbers (0) as text content', () => {
    render(0, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should render strings as text content', () => {
    render('Hello world', artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when function return empty', () => {
    let Foo = () => {
      return;
    };

    render(Foo, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when function return bool true', () => {
    let Foo = () => {
      return true;
    };

    render(Foo, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when function return bool false', () => {
    let Foo = () => {
      return false;
    };

    render(Foo, artboard);

    expect(artboard).toMatchSnapshot();
  });

  it('should not render when function return string', () => {
    let Foo = () => {
      return 'Foo';
    };

    render(Foo, artboard);

    expect(artboard).toMatchSnapshot();
  })
});
