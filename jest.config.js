export default {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/?(*.)+(test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  resetMocks: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  preset: 'ts-jest',
  rootDir: 'src/tests',
};
