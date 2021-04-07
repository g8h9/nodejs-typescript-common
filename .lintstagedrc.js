module.exports = {
  '*.{scss,json,html,md}': 'prettier --write',
  '*.{js,ts,tsx}': ['prettier --write', 'eslint --fix'],
  'package.json': ['yarn prettier --write', 'yarn sort-package-json'],
};
