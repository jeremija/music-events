define(['core/xhr/urlHelper', 'Squire', 'core/obj', 'core/assert'],
    function(urlHelper, Squire, obj, assert)
{
    'use strict';

    var windowMock = {
        document: {
            getElementById: function(id) {
                if (id !== 'settings-context') return undefined;
                var ctx = document.createElement('input');
                ctx.setAttribute('id', 'settings-context');
                ctx.setAttribute('value', '/test/');
                return ctx;
            },
        },
        location: {},
        encodeURIComponent: function(property) {
            return window.encodeURIComponent(property);
        }
    };

    new Squire().mock({
        'core/obj': obj,
        'core/assert': assert,
        'window': windowMock
    }).require(['core/xhr/urlHelper'], function(urlHelper) {
        describe('test/js/core/xhr/urlHelper-test.js (mock)', function() {
            describe('redirect()', function() {
                it('should redirect to redirect', function() {
                    urlHelper.redirect('page.html', {
                        a: 'b'
                    });
                    expect(windowMock.location.href).to.be(
                        '/test/page.html?a=b');
                });
            });
        });
    });

    describe('test/js/core/xhr/urlHelper-test.js', function() {
        describe('get()', function() {
            it('should construct url for a get request', function() {

                var url = urlHelper.get('http://test/url', {
                    name: 'john',
                    surname: 'smith',
                    'special&Field': '!@$#%#$^*'
                });

                expect(url).to.be('http://test/url?name=john&surname=smith&' +
                    'special%26Field=!%40%24%23%25%23%24%5E*');

            });
        });

        describe('getWithContext()', function() {
            after(function() {
                var ctx = document.getElementById('settings-context');
                if (ctx) ctx.parentNode.removeChild(ctx);
            });
            it('should throw error if no #settings-context', function() {
                expect(function() {
                    urlHelper.getWithContext('test.htm');
                }).to.throwError(/no ctx input element/);
            });
            it('should construct url with context prefix', function() {
                var ctx = document.createElement('input');
                ctx.setAttribute('id', 'settings-context');
                ctx.setAttribute('value', '/test/');
                document.body.appendChild(ctx);

                var url = urlHelper.getWithContext('myPage.html', {
                    name: 'john',
                    surname: 'smith',
                    'special&Field': '!@$#%#$^*'
                });

                expect(url).to.be('/test/myPage.html?name=john&surname=smith&' +
                    'special%26Field=!%40%24%23%25%23%24%5E*');
            });
        });
    });


});