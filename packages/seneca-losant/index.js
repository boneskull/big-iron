'use strict';

const {Device} = require('losant-sdk-js');
const is = require('check-more-types');

const isValidOptions = is.schema({
  key: is.unemptyString,
  id: is.unemptyString,
  secret: is.unemptyString
});

function losantDevice (options = {}) {
  if (!isValidOptions(options)) {
    throw new Error('Expected non-empty string properties "id", "key", and "secret"');
  }
  const seneca = this;
  const plugin = 'losant';
  const device = Device({
    id: options.id,
    key: options.key,
    secret: options.secret
  });
  device.connect();

  seneca.add({
    role: plugin,
    cmd: 'send'
  }, ({state = {}, time}, done) => {
    device.sendState(state, time, done);
  });

  return plugin;
}

module.exports = losantDevice;
