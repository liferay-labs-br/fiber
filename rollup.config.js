import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import eslint from 'rollup-plugin-eslint';

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
        "transform-react-jsx",
        "transform-object-rest-spread"
      ]
    }))
  ]
};
