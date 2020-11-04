module.exports = {
  extends: ['@allbin/eslint-config-react'],
  plugins: ["react-hooks"],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/no-unsafe-assignment': 'off',
    // '@typescript-eslint/restrict-plus-operands': 'off'
  },
};
