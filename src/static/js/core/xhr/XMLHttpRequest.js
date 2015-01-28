/**
 * Returns a {@link external:XMLHttpRequest} or {@link external:ActiveXObject},
 * depending sson what's found.
 * @class core/xhr/XMLHttpRequest
 * @private
 */
define(['pace', 'window'], function(pace, window) {
    'use strict';
    pace.start({
    });
    return window.XMLHttpRequest || ActiveXObject;
});