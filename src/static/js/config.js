define([], function() {
    'use strict';

    var settings = document.getElementById('settings');

    if (!settings) {
        throw new Error('no settings defined');
    }

    return JSON.parse(settings.value);
});