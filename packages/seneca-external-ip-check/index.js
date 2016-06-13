'use strict';

const extIP = require('external-ip');

function externalIPCheck (options = {}) {
  const seneca = this;
  const getIP = extIP(options);
  const plugin = 'external-ip-check';

  seneca.add({
    role: plugin,
    cmd: 'get-ip'
  }, (args, done) => {
    getIP((err, ip) => {
      if (err) {
        done(err);
      } else {
        seneca.log.info('external ip', ip);
        done(null, {ip});
      }
    });
  });

  return plugin;
}

module.exports = externalIPCheck;
