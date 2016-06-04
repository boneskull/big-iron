# seneca-ifttt-maker

> Seneca plugin to send data to IFTTT Maker

## Requirements

Node.js >= v6

## Install

```shell
$ npm i seneca seneca-ifttt-maker
```

## Usage

The `IFTTT_MAKER_KEY` environment variable must be present:

```shell
$ export IFTTT_MAKER_KEY=my-api-key
```

```js
// the plugin will create actions for each event name specified
require('seneca')()
  .use(require('seneca-ifttt-maker'), {events: [
    'my_event',
    'another_event'
  ]});
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

## Author

© 2016 Christopher Hiller <boneskull@boneskull.com> (https://boneskull.com)

## License

Released under the [MIT license](http://boneskull.mit-license.org).
