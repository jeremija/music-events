define(['Squire'], function(Squire) {
    'use strict';

    var injector = new Squire();

    var logArgs, warnArgs, errorArgs,
        logThis, warnThis, errorThis;
    var win = {
        'Function': {
            'prototype': {
                'bind': function() {

                }
            }
        },
        console: {
            log: function() {
                logThis = this;
                logArgs = Array.prototype.slice.call(arguments);
            },
            warn: function() {
                warnThis = this;
                warnArgs = Array.prototype.slice.call(arguments);

            },
            error: function() {
                errorThis = this;
                errorArgs = Array.prototype.slice.call(arguments);
            }
        }
    };

    injector.mock({
        'window': win,
        config: {
            logEnabled: true
        }
    });

    injector.require(['log'], function(log) {
        describe('test/js/log-test.js', function() {
            beforeEach(function() {
                logThis = null;
                logArgs = null;
                warnThis = null;
                warnArgs = null;
                errorThis = null;
                errorArgs = null;
            });
            it('should have keys d, w and e', function() {
                expect(log).to.only.have.keys('d', 'w', 'e');
            });
            describe('d()', function() {
                it('should fw call to console.log', function() {
                    log.d('arg1', 'arg2');
                    expect(logThis).to.be(win.console);
                    expect(logArgs).to.eql(['arg1', 'arg2']);
                });
            });
            describe('w()', function() {
                it('should fw call to console.warn', function() {
                    log.w('arg1', 'arg2');
                    expect(warnThis).to.be(win.console);
                    expect(warnArgs).to.eql(['arg1', 'arg2']);
                });
            });
            describe('e()', function() {
                it('should fw call to console.error', function() {
                    log.e('arg1', 'arg2');
                    expect(errorThis).to.be(win.console);
                    expect(errorArgs).to.eql(['arg1', 'arg2']);
                });
            });
        });
    });

    var injector2 = new Squire();

    injector2.mock({
        config: {
            logEnabled: false
        },
        'window': win
    });

    injector2.require(['log'], function(log) {

        describe('test/js/log-test.js with logDisabled', function() {
            beforeEach(function() {
                logThis = null;
                logArgs = null;
                warnThis = null;
                warnArgs = null;
                errorThis = null;
                errorArgs = null;
            });
            it('should only have keys d, w, e', function() {
                expect(log).to.only.have.keys('d', 'w', 'e');
            });
            describe('d()', function() {
                it('should be a dummy function', function() {
                    log.d('test');
                    expect(logThis).to.not.be.ok();
                    expect(logArgs).to.not.be.ok();
                });
            });
            describe('w()', function() {
                it('should be a dummy function', function() {
                    log.w('test');
                    expect(warnThis).to.not.be.ok();
                    expect(warnArgs).to.not.be.ok();
                });
            });
            describe('e()', function() {
                it('should be a dummy function', function() {
                    log.e('test');
                    expect(errorThis).to.not.be.ok();
                    expect(errorArgs).to.not.be.ok();
                });
            });
        });
    });

    var injector3 = new Squire();

    injector3.mock({
        config: {
            logEnabled: true
        },
        'window': {
            'Function': {
                prototype: {}
            },
            console: win.console
        }
    });

    injector3.require(['log'], function(log) {

        describe('test/js/log-test.js without bind()', function() {
            beforeEach(function() {
                logThis = null;
                logArgs = null;
                warnThis = null;
                warnArgs = null;
                errorThis = null;
                errorArgs = null;
            });
            it('should only have keys d, w, e', function() {
                expect(log).to.only.have.keys('d', 'w', 'e');
            });
            describe('d()', function() {
                it('should be a dummy function', function() {
                    log.d('test');
                    expect(logThis).to.not.be.ok();
                    expect(logArgs).to.not.be.ok();
                });
            });
            describe('w()', function() {
                it('should be a dummy function', function() {
                    log.w('test');
                    expect(warnThis).to.not.be.ok();
                    expect(warnArgs).to.not.be.ok();
                });
            });
            describe('e()', function() {
                it('should be a dummy function', function() {
                    log.e('test');
                    expect(errorThis).to.not.be.ok();
                    expect(errorArgs).to.not.be.ok();
                });
            });
        });
    });

    var injector4 = new Squire();

    injector4.mock({
        config: {
            logEnabled: true
        },
        'window': {
            'Function': {
                prototype: {
                    bind: function() {}
                }
            }
        }
    });

    injector4.require(['log'], function(log) {

        describe('test/js/log-test.js without window.console', function() {
            beforeEach(function() {
                logThis = null;
                logArgs = null;
                warnThis = null;
                warnArgs = null;
                errorThis = null;
                errorArgs = null;
            });
            it('should only have keys d, w, e', function() {
                expect(log).to.only.have.keys('d', 'w', 'e');
            });
            describe('d()', function() {
                it('should be a dummy function', function() {
                    log.d('test');
                    expect(logThis).to.not.be.ok();
                    expect(logArgs).to.not.be.ok();
                });
            });
            describe('w()', function() {
                it('should be a dummy function', function() {
                    log.w('test');
                    expect(warnThis).to.not.be.ok();
                    expect(warnArgs).to.not.be.ok();
                });
            });
            describe('e()', function() {
                it('should be a dummy function', function() {
                    log.e('test');
                    expect(errorThis).to.not.be.ok();
                    expect(errorArgs).to.not.be.ok();
                });
            });
        });
    });


});