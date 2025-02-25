module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['app/components/__tests__/**', 'app/contexts/__tests__/**', 'app/hooks/__tests__/**', 'app/utils/__tests__/**']
};
