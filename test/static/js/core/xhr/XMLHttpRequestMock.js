define(['core/obj', 'log'], function(obj, log) {
    'use strict';

    var mocks = {
        GET: {},
        PUT: {},
        POST: {},
        DELETE: {}
    };

    var xhrs = [];

    var delay = false;

    /**
     * @class Serves for mocking of {@link core/xhr/XMLHttpRequest}.
     * @name core/xhr/XMLHttpRequestMock
     */
    function XMLHttpRequestMock() {
        this.requestHeaders = [];
        xhrs.push(this);
    }

    XMLHttpRequestMock.prototype.abort = function() {
        this.aborted = true;
    };

    XMLHttpRequestMock.prototype.send = function(requestBody) {
        this.requestBody = requestBody;
        var mock;
        try {
            mock = mocks[this.requestType][this.requestUrl][requestBody];
            if (!mock) {
                return log.w('no mock found for ' + this.requestType +
                    ' ' + this.requestUrl);
            }
        } catch(e) {
            return log.w('no mock found for ' + this.requestType + ' ' +
                this.requestUrl);
        }
        log.d('got mock for ' + this.requestType + ' ' + this.requestUrl);

        var index = mock.count++;
        var self = this;

        function unwrap(values) {
            var len = values.length;
            return index >= len ? values[len - 1] : values[index];
        }

        mock.request = {
            type: this.requestType,
            url: this.requestUrl,
            body: this.requestBody,
            headers: this.requestHeaders
        };

        function finish() {
            self.status = unwrap(mock.statuses) || 200;
            self.readyState = mock.readyState;
            self.responseText = unwrap(mock.responses);
            self.onreadystatechange();
            if (mock.callback) mock.callback(self);
        }

        var delay = typeof mock.delay === 'number' && !isNaN(mock.delay);
        if (delay) setTimeout(finish, mock.delay); else finish();
    };
    XMLHttpRequestMock.prototype.open = function(type, url, async) {
        this.requestType = type;
        this.requestUrl = url;
        this.requestAsync = async;
    };
    XMLHttpRequestMock.prototype.setRequestHeader = function(key, value) {
        this.requestHeaders.push({
            key: key,
            value: value
        });
    };
    XMLHttpRequestMock.prototype.onreadystatechange = function() {
    };

    XMLHttpRequestMock.prototype.responseText = '';

    /**
     * Mocks a HTTP response
     * @param  {String} type        GET, PUT, POST or DELETE
     * @param  {String} url         Url to mock
     * @param  {Object} requestBody Request body to mock
     * @param  {core/xhr/XMLHttpRequestMock~HttpMockConfig} test bla
     * @memberOf core/xhr/XMLHttpRequestMock
     * @instance
     */
    XMLHttpRequestMock.mock = function(type, url, requestBody) {
        var mockType = mocks[type];
        if (!mockType) throw new Error('invalid mock request type: ' + type);

        var urlMock = mockType[url] = mockType[url] || {};

        // mock result for specific request data
        var mock = urlMock[requestBody] = {
            responses: [],
            statuses: [],
            readyState: 4,
            count: 0
        };

        log.d('added mock for: ' + type + ' ' + url);
        return new HttpMockConfig(mock);
    };

    XMLHttpRequestMock.prototype.getRequests = function() {
        return xhrs;
    };

    XMLHttpRequestMock.clear = function() {
        mocks.GET = {};
        mocks.PUT = {};
        mocks.POST = {};
        mocks.DELETE = {};
        xhrs = [];
        log.d('mocks cleared');
    };

    /**
     * @class Http mock configuration
     * @name core/xhr/XMLHttpRequestMock~HttpMockConfig
     * @param {Object} mock
     * @protected
     */
    function HttpMockConfig(mock) {
        this.mock = mock;
    }

    HttpMockConfig.prototype = {
        /**
         * @param  {Object} response
         * @return {core/xhr/XMLHttpRequestMock~HttpMockConfig}
         * @memberOf core/xhr/XMLHttpRequestMock~HttpMockConfig
         */
        response: function(response) {
            // this.mock.responseText = JSON.stringify(response);
            this.mock.responses.push(JSON.stringify(response));
            return this;
        },
        /**
         * @param  {Number} status
         * @return {core/xhr/XMLHttpRequestMock~HttpMockConfig}
         * @memberOf core/xhr/XMLHttpRequestMock~HttpMockConfig
         */
        status: function(status) {
            this.mock.statuses.push(status);
            return this;
        },
        /**
         * @param  {Number} readyState
         * @return {core/xhr/XMLHttpRequestMock~HttpMockConfig}
         * @memberOf core/xhr/XMLHttpRequestMock~HttpMockConfig
         */
        readyState: function(readyState) {
            this.mock.readyState = readyState;
            return this;
        },
        count: function() {
            return this.mock.count;
        },
        delay: function(value) {
            this.mock.delay = value;
            return this;
        },
        callback: function(callback) {
            this.mock.callback = callback;
        },
        getRequestHeader: function(key) {
            var value;
            this.mock.request.headers.some(function(header) {
                if (header.key !== key) return false;
                value = header.value;
                return true;
            });
            return value;
        }
    };

    return XMLHttpRequestMock;
});