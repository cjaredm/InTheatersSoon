module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: ["react-native", "prettier"],
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "16.3.1", // React version, default to the latest React stable release
      flowVersion: "0.67.1" // Flow version
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["flowtype", "react"],
  rules: {
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "no-alert": 0,
    "no-console": 0,
    "no-duplicate-imports": 0,
    "no-invalid-this": 0,
    "no-undef": 0,
    "no-use-before-define": 0,
    "react-native/no-color-literals": 0,
    "react/jsx-handler-names": 0,
    "react/jsx-no-bind": 0,
    "react/no-unescaped-entities": 0,
    "react/prefer-stateless-function": 0,
    "import/prefer-default-export": 0,
    "import/no-commonjs": 0
  }
};
