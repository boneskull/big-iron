# seneca-external-ip-check

[![Travis](https://img.shields.io/travis/boneskull/seneca-external-ip-check.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/boneskull/seneca-external-ip-check) [![bitHound](https://img.shields.io/bithound/dependencies/github/boneskull/seneca-external-ip-check.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/boneskull/seneca-external-ip-check) [![bitHound](https://img.shields.io/bithound/devDependencies/github/boneskull/seneca-external-ip-check.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/boneskull/seneca-external-ip-check) [![npm](https://img.shields.io/npm/v/seneca-external-ip-check.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/seneca-external-ip-check)[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)


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
