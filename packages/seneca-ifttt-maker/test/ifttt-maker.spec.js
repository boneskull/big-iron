/* eslint-env mocha */
'use strict';

const {expect} = require('chai');
const IFTTTMaker = require('..');
const IFTTT = require('node-ifttt-maker');

describe('ifttt-maker', () => {
  describe('unit', () => {
    const senecaStub = {
      add: function () {
      },
      log: {
        info: function () {
        }
      }
    };
    const func = IFTTTMaker.bind(senecaStub);

    describe('function parameters', () => {
      describe('when not passed any parameters', () => {
        it('should throw', () => {
          expect(() => func())
            .to
            .throw(Error);
        });
      });

      describe('when not passed a primitive parameter', () => {
        it('should throw', () => {
          expect(() => func('foo'))
            .to
            .throw(Error);
        });
      });

      describe('when passed an Object parameter', () => {
        let opts;

        beforeEach(() => {
          opts = {};
        });

        describe('"key" prop', () => {
          const invalidKeyTypes = new Map([
            [
              'undefined',
              undefined
            ],
            [
              'non-string primitive',
              1
            ],
            [
              'non-string Object',
              {}
            ],
            [
              'empty string',
              ''
            ]
          ]);

          beforeEach(() => {
            opts.events = [
              'bar',
              'baz'
            ];
          });

          invalidKeyTypes.forEach((value, description) => {
            describe(`when ${description}`, () => {
              it('should throw', () => {
                opts.key = value;
                expect(() => func(opts))
                  .to
                  .throw(Error);
              });
            });
          });

          describe('when non-empty string', () => {
            it('should not throw', () => {
              opts.key = 'foo';
              expect(() => func(opts))
                .not
                .to
                .throw();
            });
          });
        });

        describe('"events" prop', () => {
          const invalidEventsTypes = new Map([
            [
              'undefined',
              undefined
            ],
            [
              'primitive',
              1
            ],
            [
              'non-Array Object',
              {}
            ],
            [
              'empty Array',
              []
            ],
            [
              'Array containing one (1) or more non-strings',
              [
                1,
                'foo'
              ]
            ],
            [
              'Array containing one (1) or more empty strings',
              [
                '',
                'foo'
              ]
            ]
          ]);

          beforeEach(() => {
            opts.key = 'foo';
          });

          invalidEventsTypes.forEach((value, description) => {
            describe(`when ${description}`, () => {
              it('should throw', () => {
                opts.events = value;
                expect(() => func(opts))
                  .to
                  .throw(Error);
              });
            });
          });

          describe('when Array of non-empty strings', () => {
            it('should not throw', () => {
              opts.events = [
                'bar',
                'baz'
              ];
              expect(() => func(opts))
                .not
                .to
                .throw();
            });
          });
        });
      });
    });
  });
});

describe('integration', () => {
  let seneca;
  let request;
  const events = [
    'bar',
    'baz'
  ];

  function stub () {
    request = IFTTT.prototype.request;
    IFTTT.prototype.request = function stubRequest (params, cb) {
      process.nextTick(cb);
    };
  }

  function restore () {
    IFTTT.prototype.request = request;
  }

  beforeEach(() => {
    stub();
    seneca = require('seneca')({log: 'silent'})
      .use(IFTTTMaker, {
        key: 'foo',
        events
      });
  });

  afterEach(() => {
    restore();
  });

  it('should be loadable by Seneca', done => {
    seneca.ready(err => {
      expect(err).to.not.be.defined;
      done();
    });
  });

  describe('role:ifttt-maker,cmd:send', () => {
    describe('for each item in "events"', () => {
      events.forEach(event => {
        it(`should respond to event "${event}"`, done => {
          seneca.act({
            role: 'ifttt-maker',
            cmd: 'send',
            event
          }, err => {
            expect(err).not.to.be.defined;
            done();
          });
        });
      });
    });
  });
});
