/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // ปรับได้ตามชอบ เช่น "no-console": "warn"
  },
  overrides: [
    {
      files: ["cypress/**/*.cy.js", "cypress/support/**/*.js"],
      env: {
        browser: true,
        mocha: true,        // describe, it, beforeEach
      },
      plugins: ["cypress"],
      extends: ["plugin:cypress/recommended"],
      rules: {
        // เฉพาะเทสต์ ปรับได้ตามต้องการ
      }
    }
  ]
};
