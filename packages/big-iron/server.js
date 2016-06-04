'use strict';

require('seneca')()
  .use(require('seneca-entity'))
  .use(require('seneca-jsonfile-store'))
  .use(require('seneca-external-ip-check'))
  .use(require('seneca-ifttt-maker'), {
    events: [
      'external_ip',
      'torrent_added',
      'torrent_complete'
    ]
  })
  .use(require('seneca-cron'))
  .use(require('./lib/report-external-ip'))
  .listen()
  .client()
  .ready(function onReady (err) {
    if (err) {
      throw new Error(err);
    }

    this.act({
      role: 'web',
      use: {
        prefix: '/torrent',
        pin: {
          role: 'ifttt-maker',
          cmd: 'send',
          event: '*'
        },
        map: {
          POST: true
        }
      }
    });

    this.act({
      role: 'cron',
      cmd: 'addjob',
      time: '* 5 * * * *',
      act: () => {
        this.act({
          role: 'report-external-ip',
          cmd: 'check'
        }, err => {
          if (err) {
            throw new Error(err);
          }
          this.log.info('big-iron', 'check', 'complete');
        });
      }
    });
  });
