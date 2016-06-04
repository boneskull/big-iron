'use strict';
const os = require('os');

function reportExternalIP () {
  const seneca = this;
  const plugin = 'report-external-ip';

  function report ({hostname, ip}, done) {
    seneca.act({
      role: 'ifttt-maker',
      event: 'external_ip',
      cmd: 'send',
      value1: hostname,
      value2: ip
    }, done);
  }

  function update (server, ip, done) {
    server.ip = ip;
    server.save$((err, {hostname}) => {
      if (err) {
        done(err);
        return;
      }
      seneca.log.info(hostname, 'saved');
      seneca.act({
        role: plugin,
        cmd: 'report',
        hostname,
        ip
      }, err => {
        if (err) {
          done(err);
          return;
        }
        seneca.log.info(hostname, 'reported');
        done();
      });
    });
  }

  function check (args, done) {
    const hostname = os.hostname();

    seneca.make(plugin, 'server')
      .list$({hostname}, (err, list) => {
        let server;
        if (list.length) {
          server = list[0];
        } else {
          server = seneca.make(plugin, 'server');
          server.hostname = hostname;
        }

        seneca.act({
          role: 'external-ip-check',
          cmd: 'get-ip'
        }, (err, {ip}) => {
          if (err) {
            done(err);
            return;
          }

          seneca.log.info(hostname, ip);
          if (server.ip === ip) {
            seneca.log.info(hostname, 'no change');
          } else {
            update(server, ip, done);
          }
          done();
        });
      });
  }

  seneca.add({
    role: plugin,
    cmd: 'report'
  }, report);

  seneca.add({
    role: plugin,
    cmd: 'check'
  }, check);

  return plugin;
}

module.exports = reportExternalIP;
