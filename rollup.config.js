import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: [
      {
        name: 'observableGraphqlClient',
        file: 'dist/browser/index.js',
        format: 'umd'
      },
      {
        name: 'observableGraphqlClient',
        file: 'dist/browser/index.min.js',
        format: 'umd',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [resolve(), commonjs()]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: ['rxjs', '@barejs/graphql-client'],
    output: [
      {
        file: 'dist/index.js',
        format: 'es'
      },
      {
        file: 'dist/cjs/index.js',
        format: 'cjs'
      }
    ]
  }
]
