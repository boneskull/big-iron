'use strict';

const IFTTT = require('node-ifttt-maker');
const is = require('check-more-types');

const isValidOptions = is.schema({
  key: is.unemptyString,
  events: is.and(is.unemptyArray, is.arrayOf.bind(null, is.unemptyString))
});

function IFTTTMaker (options) {
  if (!isValidOptions(options)) {
    throw new Error('Invalid options; expected Object with non-empty string "key" and non-empty Array "events" of non-empty strings');
  }

  const seneca = this;
  const {key, events} = options;
  const client = new IFTTT(key);
  const plugin = 'ifttt-maker';

  events.forEach(event => {
    seneca.add({
      role: plugin,
      cmd: 'send',
      event
    }, ({method = 'GET', value1, value2, value3}, done) => {
      client.request({
        event,
        params: {
          value1,
          value2,
          value3
        },
        method
      }, err => {
        if (err) {
          done(err);
          return;
        }
        seneca.log.info('request', 'ok');
        done();
      });
    });
    seneca.log.info('event-added', event);
  });

  return plugin;
}

module.exports = IFTTTMaker;
