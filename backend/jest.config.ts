import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!uuid/)',
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: false }],
  },
};

export default config;
