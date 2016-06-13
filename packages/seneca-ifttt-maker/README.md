# seneca-ifttt-maker

[![Travis](https://img.shields.io/travis/boneskull/seneca-ifttt-maker.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/boneskull/seneca-ifttt-maker) [![bitHound](https://img.shields.io/bithound/dependencies/github/boneskull/seneca-ifttt-maker.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/boneskull/seneca-ifttt-maker) [![bitHound](https://img.shields.io/bithound/devDependencies/github/boneskull/seneca-ifttt-maker.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/boneskull/seneca-ifttt-maker) [![npm](https://img.shields.io/npm/v/seneca-ifttt-maker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/seneca-ifttt-maker)

> Seneca plugin to send data to IFTTT Maker

## Requirements

Node.js >= v6

## Install

```shell
$ npm i seneca seneca-ifttt-maker
```

## Usage

```js
// the plugin will create actions for each event name specified
require('seneca')()
  .use(require('seneca-ifttt-maker'), {
    events: [
      'my_event',
      'another_event'
    ],
    key: 'MY_IFTTT_MAKER_KEY'
  });
```

## Action Patterns

### Send IFTTT Maker Request

`role:ifttt-maker`, `cmd:send`

**Required** arguments:
- `event` - event as configured via options.  `test_event` available by default, if none specified.

*Optional* arguments:
- `method` - `GET` or `POST`
- `value1` - `Value1` value
- `value2` - `Value2` value
- `value3` - `Value3` value

*Returns `undefined` upon success*.

## License

© 2016 [Christopher Hiller](https://boneskull.com).  Licensed MIT.
