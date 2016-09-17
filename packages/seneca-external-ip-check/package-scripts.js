'use strict';

exports.scripts = {
  commit: {
    description: 'This uses commitizen to help us generate beautifully formatted commit messages',
    script: 'git-cz'
  },
  test: {
    description: 'Test, lint & generate coverage',
    default: 'p-s -p test.lint,test.mocha',
    lint: {
      script: 'eslint index.js test',
      description: 'Lint code'
    },
    mocha: {
      description: 'Run tests w/ Mocha',
      script: 'nyc mocha'
    }
  },
  coverage: {
    description: 'Generate coverage report & send to codecov.io',
    default: 'p-s coverage.report,coverage.send',
    report: {
      description: 'Generate LCOV report via nyc',
      script: 'nyc report -r lcov'
    },
    send: {
      description: 'Send coverage stats to codecov.io',
      script: 'codecov'
    }
  },
  release: {
    description: 'Release with semantic-release',
    script: 'semantic-release pre && npm publish && semantic-release post'
  },
  hooks: {
    'opt-in': 'opt --in commit-msg --exec "validate-commit-msg" && opt --in pre-commit --exec "npm test"',
    'opt-out': 'opt --out commit-msg --exec "validate-commit-msg" && opt --out pre-commit --exec "npm test"'
  }
};
