# seneca-external-ip-check

> Seneca plugin to return the external IP of server

## Requirements

Node.js >= v6

## Install

```shell
$ npm i seneca seneca-ifttt-maker
```

## Usage

```js
require('seneca')()
  .use(require('seneca-external-ip-maker'), configuration);
```

`configuration` is passed directly to [external-ip](https://www.npmjs.com/package/external-ip) module, and is entirely optional.

## Action Patterns

### Get External IP Address

`role:external-ip-check`, `cmd:get-ip`

Returns:
- `{ip: "<external-ip>"}`

## Author

© 2016 Christopher Hiller <boneskull@boneskull.com> (https://boneskull.com)

## License

Released under the [MIT license](http://boneskull.mit-license.org).
