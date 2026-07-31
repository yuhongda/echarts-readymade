import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          // include: ['**/__test__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
          include: ['**/__test__/**/core.test.tsx'],
          exclude: ['**/__test__/**/*.browser.{test,spec}.{js,jsx,ts,tsx}'],
          setupFiles: ['./__test__/vitest.setup.ts'],
          clearMocks: true,
          testTimeout: 50000
        },
        resolve: {
          alias: {
            assets: path.resolve(__dirname, 'packages/wordcloud/src/assets')
          }
        }
      },
      {
        test: {
          name: 'browser',
          globals: true,
          environment: 'jsdom',
          include: ['**/__test__/**/*.browser.{test,spec}.{js,jsx,ts,tsx}'],
          setupFiles: ['./__test__/vitest.setup.ts'],
          clearMocks: true,
          testTimeout: 50000,
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }]
          }
        },
        resolve: {
          alias: {
            assets: path.resolve(__dirname, 'packages/wordcloud/src/assets')
          }
        }
      }
    ],
    coverage: {
      provider: 'v8',
      reportsDirectory: './__test__/coverage',
      reporter: ['json-summary', 'clover', 'json', 'lcov', 'text'],
      include: ['packages/**/src/**/*.{js,jsx,ts,tsx}']
    }
  }
})
