module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['app/components/__tests__/**']
};
