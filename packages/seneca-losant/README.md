# seneca-losant

[![Travis](https://img.shields.io/travis/boneskull/seneca-losant.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/boneskull/seneca-losant) [![bitHound](https://img.shields.io/bithound/dependencies/github/boneskull/seneca-losant.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/boneskull/seneca-losant) [![bitHound](https://img.shields.io/bithound/devDependencies/github/boneskull/seneca-losant.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/boneskull/seneca-losant) [![npm](https://img.shields.io/npm/v/seneca-losant.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/seneca-losant)

> Seneca plugin for interacting with Losant API
## Requirements

Node.js >= v6

## Install

```shell
$ npm i seneca seneca-losant
```

## Usage

```js
require('seneca')()
  .use(require('seneca-losant'), {
    id: 'MY_DEVICE_ID',
    key: 'API_ACCESS_KEY',
    secret: 'SECRET_KEY'
  });
```

## Action Patterns

### Send Device State to Losant

`role:losant`, `cmd:send`

**Required** arguments:
- `state` - Object representing device state; keys should be configured in the device's settings on Lodash's site

*Optional* arguments:
- `time` - A `Date` object representing the time of the state update.  Defaults to "now".

*Returns `undefined` upon success*.

## License

© 2016 [Christopher Hiller](https://boneskull.com).  Licensed MIT.
