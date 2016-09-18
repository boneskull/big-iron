'use strict';

exports.scripts = {
  bootstrap: {
    description: 'Bootstrap with Lerna',
    script: 'lerna bootstrap'
  },
  commit: {
    description: 'This uses commitizen to help us generate beautifully formatted commit messages',
    script: 'git-cz'
  },
  test: {
    description: 'Test, lint & generate coverage',
    default: 'p-s test.lint,test.mocha',
    lint: {
      script: 'eslint index.js test',
      description: 'Lint code'
    },
    mocha: {
      description: 'Run tests w/ Mocha',
      script: 'nyc mocha --colors'
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
    description: 'Release with lerna-semantic-release',
    script: 'lerna-semantic-release pre && lerna-semantic-release perform && lerna-semantic-release post'
  }
};
