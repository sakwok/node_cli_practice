const config = {
  collectCoverageFrom: ["src/**/*.{js}"],
  coveragePathIgnorePatterns: ["node_modules/"],
  coverageReporters: ["text", "json", "html"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

module.exports = config;
