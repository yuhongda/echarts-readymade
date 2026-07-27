import { defineConfig } from 'rolldown'

const external = [
  'react',
  'react-dom',
  'echarts',
  'echarts/core',
  'echarts/charts',
  'echarts/components',
  'echarts/renderers',
  'big.js'
]

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  echarts: 'echarts',
  'big.js': 'Big'
}

const base = {
  input: './src/index.tsx',
  tsconfig: './tsconfig.json',
  external,
  preserveEntrySignatures: 'strict' as const,
  transform: {
    target: 'es2017',
    jsx: 'react' as const,
    define: {
      __VERSION__: '"x.y.z"'
    }
  }
}

export default defineConfig([
  {
    ...base,
    output: {
      format: 'cjs',
      file: 'lib/cjs/index.cjs.js',
      exports: 'named'
    }
  },
  {
    ...base,
    output: {
      format: 'es',
      file: 'lib/es/index.es.js',
      exports: 'named'
    }
  },
  {
    ...base,
    transform: {
      ...base.transform,
      define: {
        ...base.transform.define,
        'process.env.NODE_ENV': '"development"'
      }
    },
    output: {
      format: 'umd',
      name: 'EchartsReadymadeBar',
      file: 'lib/umd/index.js',
      exports: 'named',
      globals
    }
  },
  {
    ...base,
    transform: {
      ...base.transform,
      define: {
        ...base.transform.define,
        'process.env.NODE_ENV': '"production"'
      }
    },
    output: {
      format: 'umd',
      name: 'EchartsReadymadeBar',
      file: 'lib/umd/index.min.js',
      exports: 'named',
      globals,
      minify: true
    }
  }
])
