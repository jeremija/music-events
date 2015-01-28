define(['core/json', 'core/xhr/XMLHttpRequest', 'core/xhr/urlHelper', 'log',
    'core/obj', 'q'],
    function(json, XMLHttpRequest, urlHelper, log, obj, Q)
{
    'use strict';

    function deprecated(message) {
        if (console && console.warn) {
            console.warn('DEPRECATED', message);
        }
    }

    function httpTemplate(params) {
        params = params || {};
        var options = {
            urlPrefix: params.urlPrefix || '',
            statusHandlers: params.statusHandlers || {},
            headers: params.headers || {},
            allowFullUrls: params.allowFullUrls || true
        };

        function parse(xhr) {
            var result = json.parse(xhr.responseText);
            return result;
        }

        function getFullUrl(url) {
            if (options.allowFullUrls &&
                (url.match('^http:\/\/') ||
                url.match('^https:\/\/')))
            {
                return url;
            }
            return options.urlPrefix + url;
        }

        function createXhrRequest(type, url, data, additionalSettings) {
            var deferred = Q.defer(),
                promise = deferred.promise;

            additionalSettings = additionalSettings || {};

            var settings = {
                statusHandlers: Object.create(options.statusHandlers),
                headers: Object.create(options.headers),
            };

            obj.each(additionalSettings.headers, function(value, key) {
                settings.headers[key] = value;
            });

            obj.each(additionalSettings.statusHandlers, function(value, key) {
                settings.statusHandlers[key] = value;
            });

            var xhr = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
            var fullUrl = getFullUrl(url);
            xhr.open(type, fullUrl, true);

            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onreadystatechange = function() {
                if (xhr.readyState !== 4) return;
                log.d('<==', type, fullUrl);

                var status = xhr.status;
                var statusHandler = settings.statusHandlers[status];
                if (statusHandler) statusHandler.call(undefined, status);

                var response = {
                    status: xhr.status,
                    body: parse(xhr)
                };

                if (status !== 200) {
                    var resError = response.body && response.body.error;
                    var msg = resError && resError.message || 'xhr error';
                    var code = resError && resError.code;
                    var error = new Error(msg || 'xhr error');
                    error.code = code;
                    error.status = xhr.status;
                    deferred.reject(error);
                    return;
                }

                deferred.resolve(response);
            };

            promise.data = function() {
                return promise.then(function(response) {
                    return response.body.data;
                });
            };

            log.d('==>', type, fullUrl);

            for (var header in settings.headers) {
                xhr.setRequestHeader(header, settings.headers[header]);
            }

            xhr.send(json.stringify(data));

            return promise;
        }

        var template = Object.freeze({
            config: function() {
                var settings = {
                    headers: {},
                    statusHandlers: {}
                };
                return Object.freeze({
                    addHeader: function(key, value) {
                        settings.headers[key] = value;
                        return this;
                    },
                    headers: function(headers) {
                        settings.headers = headers || {};
                        return this;
                    },
                    addStatusHandler: function(status, callback) {
                        settings.statusHandlers[status] = callback;
                        return this;
                    },
                    statusHandlers: function(statusHandlers) {
                        settings.statusHandlers = statusHandlers || {};
                        return this;
                    },
                    get: function(url, params) {
                        url = urlHelper.get(url, params);
                        return createXhrRequest('GET', url, undefined, settings);
                    },
                    put: function(url, data) {
                        return createXhrRequest('PUT', url, data, settings);
                    },
                    post: function(url, data) {
                        return createXhrRequest('POST', url, data, settings);
                    },
                    delete: function(url) {
                        return createXhrRequest('DELETE', url, undefined, settings);
                    }
                });
            },
            /**
             * Dispatch a GET request
             * @param  {String} url
             * @return {Promise}
             */
            get: function(url, params) {
                return this.config().get(url, params);
            },
            /**
             * Dispatch a PUT request
             * @param  {String} url
             * @param  {Object} data
             * @return {Promise}
             */
            put: function(url, data) {
                return this.config().put(url, data);
            },
            /**
             * Dispatch a POST request
             * @param  {String} url
             * @param  {Object} data
             * @return {Promise}
             */
            post: function(url, data) {
                return this.config().post(url, data);
            },
            /**
             * Dispatch a DELETE request
             * @param  {String} url
             * @param  {Function} callback
             * @return {Promise}
             */
            delete: function(url) {
                return this.config().delete(url);
            }
        });

        return template;
    }

    return httpTemplate;
});