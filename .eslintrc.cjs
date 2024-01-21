const baseConfig = require("@eliasm307/config/eslint")({ withReact: true, withPrettier: true });
const path = require("node:path");

module.exports = {
  ...baseConfig,
  root: true,
  ignorePatterns: [
    "**/next.config.js",
    "**/public/**",
    "**/out/**",
    "**/node_modules/**",
    "**/coverage/**",
  ],
  rules: {
    ...baseConfig.rules,
    // "import/extensions": ["error", "ignorePackages"],
    "import/no-extraneous-dependencies": [
      "warn",
      {
        packageDir: [__dirname, path.join(__dirname, "packages/common")],
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    "nonblock-statement-body-position": "off",
  },
  overrides: [
    ...baseConfig.overrides,
    {
      files: ["**/next.config.js"],
      rules: {
        "functional-core/purity": "off", // has an issue getting scope for this file for some reason
      },
    },
  ],
};
