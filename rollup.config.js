import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

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
  input: 'src/Fiber.js',
  output: {
    format: 'umd',
    file: 'build/fiber.js',
    name: 'Fiber',
    sourcemap: true
  },
  plugins: [
    // TODO: Fix eslint plugin errors
    // eslint({
    //   exclude: [
    //     'node_modules/**'
    //   ]
    // }),
    babel(babelrc({
      addExternalHelpersPlugin: false,
      config: babelConfig,
      exclude: 'node_modules/**',
      plugins: [
        "transform-object-rest-spread"
      ]
    }))
  ]
};
