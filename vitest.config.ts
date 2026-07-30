import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // include: ['**/__test__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    include: ['**/__test__/core.test.tsx'],
    setupFiles: ['./__test__/vitest.setup.ts'],
    clearMocks: true,
    testTimeout: 50000,
    coverage: {
      provider: 'v8',
      reportsDirectory: './__test__/coverage',
      reporter: ['json-summary', 'clover', 'json', 'lcov', 'text'],
      include: ['packages/**/src/**/*.{js,jsx,ts,tsx}']
    }
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'packages/wordcloud/src/assets')
    }
  }
})
