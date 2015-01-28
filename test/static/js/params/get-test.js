define(['Squire', 'params/get', 'core/xhr/urlHelper'],
    function(Squire, get, urlHelper)
{
    'use strict';

    var w = {
        location: {
            search: '?key=value'
        },
        encodeURIComponent: window.encodeURIComponent,
        decodeURIComponent: window.decodeURIComponent
    };

    new Squire().mock({
        window: w,
        'core/xhr/urlHelper': urlHelper
    }).require(['params/get'], function(get) {
        describe('test/js/params/get-test.js', function() {
            var test = document.querySelector('#test'),
                ctx;
            before(function() {
                ctx = document.createElement('input');
                ctx.setAttribute('id', 'settings-context');
                ctx.value = 'http://ctx';
                test.appendChild(ctx);
            });
            after(function() {
                test.removeChild(ctx);
            });

            it('should be an object', function() {
                expect(get).to.be.an('object');
            });

            describe('parsed', function() {
                it('should contain the parsed get map on load', function() {
                    expect(get.parsed).to.be.an('object');
                    expect(get.parsed).to.eql({
                        key: 'value'
                    });
                });
            });

            describe('parse()', function() {
                var _getQueryStringOrig, query = '';
                it('should be a function', function() {
                    expect(get.parse).to.be.a('function');
                });
                it('should map single argument', function() {
                    w.location.search = '?key=value';
                    var args = get.parse();
                    expect(args).to.only.have.keys('key');
                    expect(args.key).to.be('value');
                });
                it('should map multiple arguments', function() {
                    w.location.search = '?key1=value1&key2=value2';
                    var args = get.parse();
                    expect(args).to.only.have.keys('key1', 'key2');
                    expect(args.key1).to.be('value1');
                    expect(args.key2).to.be('value2');
                });
                it('should decode args', function() {
                    var key1 = window.encodeURIComponent('key!@#$%'),
                        key2 = window.encodeURIComponent('key^&*()='),
                        value1 = window.encodeURIComponent('value!@#$%'),
                        value2 = window.encodeURIComponent('value^&*()=');

                    w.location.search =
                        '?' + key1 + '=' + value1 + '&' + key2 + '=' + value2;

                    var args = get.parse();
                    expect(args).to.only.have.keys('key!@#$%', 'key^&*()=');
                    expect(args['key!@#$%']).to.be('value!@#$%');
                    expect(args['key^&*()=']).to.be('value^&*()=');
                });
            });

            describe('format()', function() {
                it('should format and encode url', function() {
                    var val = get.format('http://my', {
                        value1: 'ab!@#',
                        'ab&': 2
                    });
                    expect(val).to.be('http://my?value1=ab!%40%23&ab%26=2');
                });
                it('should return the same url if no params', function() {
                    var val = get.format('http://my', {});
                    expect(val).to.be('http://my');
                    val = get.format('http://my', null);
                    expect(val).to.be('http://my');
                });
            });
            describe('formatWithContext()', function() {
                it('should format and encode url with context', function() {
                    var val = get.formatWithContext('/page.html', {
                        value1: 'ab!@#',
                        'ab&': 2
                    });
                    expect(val).to.be(
                        'http://ctx/page.html?value1=ab!%40%23&ab%26=2');
                });
                it('should return normal url if no params', function() {
                    var val = get.formatWithContext('/page.html', {});
                    expect(val).to.be('http://ctx/page.html');
                    val = get.formatWithContext('/page.html', undefined);
                    expect(val).to.be('http://ctx/page.html');
                });
            });
        });
    });

});