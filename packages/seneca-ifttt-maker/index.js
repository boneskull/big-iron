'use strict';

const IFTTT = require('node-ifttt-maker');

function iftttMaker (options = {}) {
  const seneca = this;
  const client = new IFTTT(options.key);
  const plugin = 'ifttt-maker';
  const events = options.events || ['test_event'];

  events.forEach((event) => {
    seneca.add({
      role: plugin,
      cmd: 'send',
      event
    }, ({method, value1, value2, value3}, done) => {
      client.request({
        event,
        params: {
          value1,
          value2,
          value3
        },
        method: method || 'GET'
      }, (err) => {
        if (err) {
          done(err);
          return;
        }
        seneca.log.info('request', 'ok');
        done();
      });
    });
    seneca.log.info('event', event);
  });

  return plugin;
}

module.exports = iftttMaker;
