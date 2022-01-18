module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["@swc-node/jest", { module: "commonjs" }],
  },
  testMatch: ["./(**/*.spec.(ts|tsx|js)|**/__tests__/*.(ts|tsx|js))"],
  moduleFileExtensions: ["js", "ts", "json", "vue", "jsx", "tsx"],
  maxWorkers: 1,
  verbose: true,
  setupFiles: ["./tests/setup/index.ts"],
};
