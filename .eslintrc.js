module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
      '@typescript-eslint',
      // "jest",
      "react",
      "react-hooks"
  ],
  extends: [
      "plugin:@typescript-eslint/eslint-recommended",
      'plugin:@typescript-eslint/recommended',
      "plugin:react/recommended",
      "plugin:jsx-control-statements/recommended",
      "plugin:react-hooks/recommended"
  ],
  env: {
      browser: true,
      es6: true,
      node: true,
      "jsx-control-statements/jsx-control-statements": true
  },
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "JSX": true,
      parrser: 'babel-eslint'
  },
  rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // "no-param-reassign": [
      //     "error",
      //     {
      //         "props": false
      //     }
      // ],
      // "no-undef": 2,
      "jsx-control-statements/jsx-jcs-no-undef": ['off'],
      "no-console": [
          1,
          {
              "allow": [
                  "warn",
                  "error",
                  "log"
              ]
          }
      ],
      "no-debugger": 1,
      "import/extensions": 0,
      "import/no-unresolved": 0,
      "no-mixed-spaces-and-tabs": 0,
      "import/no-named-as-default": 0,
      "import/first": 0,
      "no-var": 1,
      "no-unused-expressions": 0,
      // "semi": [
      //     1,
      //     "always"
      // ],
      "no-trailing-spaces": 0,
      "eol-last": 0,
      "no-restricted-syntax": 0,
      "max-len": [
          0,
          80,
          4
      ],
      "no-plusplus": 0,
      "no-tabs": "off",
      "eqeqeq": 0,
      "import/no-named-as-default-member": 0,
      "prefer-destructuring": [
          "error",
          {
              "object": false,
              "array": false
          }
      ],
      "react/prop-types": 0,
      "react/no-deprecated": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-non-null-assertion": 0,
      "@typescript-eslint/ban-types": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-empty-interface": 0, // 允许空的interface
      "@typescript-eslint/no-this-alias": [
          0,
          "self"
      ],
      "jsx-control-statements/jsx-use-if-tag": 0,
      "no-underscore-dangle": 0,
      "no-restricted-properties": [
          2,
          {
              "object": "require",
              "message": "Please call require() directly."
          }
      ],
      "no-alert": 0,
      "global-require": 0,
      "no-lone-blocks": 0,
      // "no-unused-vars": [
      //     "error",
      //     {
      //         "vars": "all",
      //         "args": "none"
      //     }
      // ],
      "no-extend-native": 0,
      "import/no-extraneous-dependencies": 0,
      "arrow-body-style": 0,
      "func-names": 0,
      "no-mixed-operators": 0,
      "prefer-template": 0,
      "no-use-before-define": 1,
      "guard-for-in": 1,
      "camelcase": 0,
      "no-bitwise": 0,
      "no-useless-escape": 0,
      "space-in-parens": 0,
      "consistent-this": [
          0,
          "self"
      ],
  },
  // overrides: [
  //     {
  //         // enable the rule specifically for TypeScript files
  //         files: ["*.ts", "*.tsx"],
  //         rules: {
  //             "@typescript-eslint/explicit-member-accessibility": [
  //                 "error",
  //                 {
  //                     accessibility: 'explicit',
  //                     overrides: {
  //                         // accessors: 'explicit',
  //                         constructors: 'no-public',
  //                         // methods: 'explicit',
  //                         // properties: 'off',
  //                         // parameterProperties: 'explicit'
  //                     }
  //                 }
  //             ]
  //         }
  //     }
  // ],
}