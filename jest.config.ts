/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: '<rootDir>/__test__/coverage',
  coverageProvider: 'babel',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFiles: ['jest-canvas-mock', '<rootDir>/__test__/setup.js'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/__test__/**/*.(spec|test).{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      '<rootDir>/node_modules/babel-jest',
      { configFile: './__test__/jest.babelrc' }
    ],
    '^.+\\.m\\.(less|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
    '^.+\\.(css|less|scss)$': '<rootDir>/__test__/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|less|scss|json)$)': '<rootDir>/__test__/fileTransform.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es/).+(js|jsx|ts|tsx|mjs)$'],
  coverageReporters: ['json-summary', 'clover', 'json', 'lcov', 'text'],
  testTimeout: 50000,
  moduleNameMapper: {
    'assets/(.*)': ['<rootDir>/packages/wordcloud/src/assets/$1']
  }
}
