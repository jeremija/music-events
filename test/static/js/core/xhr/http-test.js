define(['test/js/core/xhr/XMLHttpRequestMock', 'Squire', 'core/json', 'log'],
    function(XMLHttpRequestMock, Squire, json, log) {
    'use strict';

    var injector = new Squire();

    injector.mock({
        'core/xhr/XMLHttpRequest': XMLHttpRequestMock,
        'json': json,
        'log': log
    });

    injector.require(['core/xhr/http'],
        function(http) {

        describe('test/js/core/xhr/http-test.js', function() {
            var request;
            describe('get()', function() {
                var requestMock;
                before(function() {
                    requestMock = XMLHttpRequestMock
                        .mock('GET', '/my/test/url').response({
                            key: 'value'
                        });
                });
                after(function() {
                    XMLHttpRequestMock.clear();
                });
                afterEach(function() {
                    requestMock.callback(undefined);
                });

                it('should set request headers and type', function(done) {
                    requestMock.callback(function(xhr) {
                        expect(xhr.requestHeaders[1].key).to.be('custom-header');
                        expect(xhr.requestHeaders[1].value).to.be('custom-header-val');
                        done();
                    });

                    var promise = http.config()
                        .headers({
                            'custom-header': 'custom-header-val'
                        })
                        .get('/my/test/url');
                });
                it('should call callback on success', function(done) {
                    requestMock.status(200).readyState(4);

                    var request = http.config()
                        .statusHandlers({
                            404: function(status, xhr) {
                               throw new Error('should not call status handlers');
                            }
                        })
                        .get('/my/test/url').then(function(response) {
                            expect(response).to.be.an('object');
                            expect(response.body).to.be.an('object');
                            expect(response.body.key).to.be('value');
                            done();
                        });
                });

                it('should call callback on failure', function(done) {
                    requestMock.status(404).readyState(4);

                    var called404 = false;
                    var request = http.config()
                        .statusHandlers({
                            404: function(status, xhr) {
                                called404 = true;
                            }
                        })
                        .get('/my/test/url')
                        .then(function() {
                            throw new Error('should not reach here');
                        })
                        .catch(function(err) {
                            expect(err).to.be.an(Error);
                            expect(err.message).to.match(/xhr/);
                            expect(called404).to.be(true);
                            done();
                        }).done();
                });
            });

            describe('get() with params', function() {
                before(function() {
                    XMLHttpRequestMock
                        .mock('GET', '/my/test/url2?param=value').response({
                            key: 'value'
                        });
                });
                after(function() {
                    XMLHttpRequestMock.clear();
                });
                it('should set get parameters', function(done) {
                    http.get('/my/test/url2', {
                        param: 'value'
                    }).then(function(response) {
                        expect(response).to.be.an('object');
                        expect(response.body).to.be.an('object');
                        expect(response.body.key).to.be('value');
                        done();
                    }).done();
                });
            });

        });

    });
});