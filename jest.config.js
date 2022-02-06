/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    'src/.+\\.(j|t)sx?$': 'ts-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/*',
    '/dist/*'
  ],
  transformIgnorePatterns: [
    'dist/*',
    'node_modules/(?!variables/.*)'
  ]
}
