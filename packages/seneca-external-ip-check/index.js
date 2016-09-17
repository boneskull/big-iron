'use strict';

const extIP = require('external-ip');
const plugin = 'external-ip-check';

function externalIPCheck (opts = {}) {
  const seneca = this;
  const getIP = extIP(opts);

  seneca.add({
    role: plugin,
    cmd: 'get-ip'
  }, (args, done) => {
    getIP((err, ip) => {
      if (err) {
        done(err);
        return;
      }
      seneca.log.info('external ip', ip);
      done(null, {ip});
    });
  });

  return plugin;
}

module.exports = externalIPCheck;
