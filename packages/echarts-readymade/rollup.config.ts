import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import type { RollupOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import { visualizer } from 'rollup-plugin-visualizer'

const format = process.env.FORMAT || 'es'

const config: RollupOptions = {
  input: './src/index.ts',
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    image(),
    visualizer()
  ],

  external: [
    'react',
    'react-dom',
    'echarts',
    'echarts/core',
    'echarts/charts',
    'echarts/components',
    'echarts/renderers'
  ]
}

if (format === 'es' || format === 'cjs' || format === 'umd') {
  config.output = {
    name: 'EchartsReadymade',
    format,
    file:
      format === 'umd'
        ? process.env.NODE_ENV === 'production'
          ? 'lib/umd/index.min.js'
          : `lib/${format}/index.${format}.js`
        : `lib/${format}/index.${format}.js`
  }

  config.plugins?.push(
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: false, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'es2017', // default, or 'es20XX', 'esnext'
      jsx: 'transform', // default, or 'preserve'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"'
      },
      tsconfig: 'tsconfig.json', // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
        // Enable JSX in .js files too
        '.js': 'jsx'
      }
    })
  )
}

if (format === 'umd') {
  config.output = {
    format,
    name: 'EchartsReadymade',
    file: process.env.NODE_ENV === 'production' ? 'lib/umd/index.min.js' : 'lib/umd/index.js',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      echarts: 'echarts'
    }
  }
  config.plugins?.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  )
}

if (format === 'dts') {
  config.output = {
    format: 'es',
    file: 'types/index.d.ts'
  }
  config.plugins = [dts()]
}

export default config
