module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  // overrides: [
  //   {
  //     files: ['__tests__/**'],
  //     plugins: ['jest'],
  //     extends: ['plugin:jest/recommended'],
  //     rules: { 'jest/prefer-expect-assertions': 'off' }
  //   },
  // ],
  overrides: [
    Object.assign(
      {
        files: ['**/*.test.js'],
        env: { jest: true },
        plugins: ['jest'],
      },
      require('eslint-plugin-jest').configs.recommended,
    ),
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['jest'],
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['off', { devDependencies: false, optionalDependencies: false, peerDependencies: false }],
    'no-unused-vars': ['off', { argsIgnorePattern: 'next' }],
    'max-len': ['off'],
    'import/no-dinamic-require': ['off'],
    'prefer-destructuring': ['off'],
    'prefer-object-spread': ['off'],
  },
};
