import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
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
    plugins: [
      typescript({
        typescript: require('typescript')
      }),
      resolve(),
      commonjs()
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    external: ['rxjs', '@barejs/graphql-client'],
    output: [
      {
        file: pkg.module,
        format: 'esm'
      },
      {
        file: pkg.main,
        format: 'cjs'
      }
    ],
    plugins: [
      typescript({
        typescript: require('typescript')
      })
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ]
  }
]
