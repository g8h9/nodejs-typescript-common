module.exports = {
  hooks: {
    'commit-msg': 'commitlint --color -E HUSKY_GIT_PARAMS',
    'pre-commit': 'lint-staged',
  },
};
