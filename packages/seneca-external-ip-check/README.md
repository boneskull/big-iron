# seneca-external-ip-check

[![npm](https://img.shields.io/npm/v/seneca-external-ip-check.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/seneca-external-ip-check) [![Travis](https://img.shields.io/travis/boneskull/seneca-external-ip-check.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/boneskull/seneca-external-ip-check) [![codecov](https://codecov.io/gh/boneskull/seneca-external-ip-check/branch/master/graph/badge.svg)](https://codecov.io/gh/boneskull/seneca-external-ip-check)

> Seneca plugin to return the external IP of server

## Requirements

Node.js >= v6

## Install

```shell
$ npm i seneca seneca-external-ip-check
```

## Usage

```js
require('seneca')()
  .use(require('seneca-external-ip-check'), configuration);
```

`configuration` is passed directly to [external-ip](https://www.npmjs.com/package/external-ip) module, and is entirely optional.

## Action Patterns

### Get External IP Address

`role:external-ip-check`, `cmd:get-ip`

Returns:
- `{ip: "<external-ip>"}`

## License

© 2016 [Christopher Hiller](https://boneskull.com).  Licensed MIT.
