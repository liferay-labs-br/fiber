import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import eslint from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import flow from 'rollup-plugin-flow';

const babelConfig = {
  'presets': [
    ['env', {
      'targets': {
        'browsers': ['last 2 versions', 'IE >= 9']
      },
      'loose': true
    }]
  ]
};

export default {
  input: 'src/fiber.js',
  output: {
    format: 'umd',
    file: 'build/fiber.js',
    name: 'Fiber',
    sourcemap: true
  },
  plugins: [
    flow(),
    replace({
      exclude: 'node_modules/**',
      __DEV__: JSON.stringify(process.env.NODE_ENV == 'development'),
    }),
    eslint({
      exclude: [
        'node_modules/**'
      ]
    }),
    babel(babelrc({
      addExternalHelpersPlugin: false,
      config: babelConfig,
      exclude: 'node_modules/**',
      plugins: [
        "transform-object-rest-spread"
      ]
    })),
  ]
};
