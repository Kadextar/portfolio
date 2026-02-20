import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/i18n/navigation$": "<rootDir>/src/__mocks__/i18n/navigation.tsx",
  },
};

export default createJestConfig(config);
