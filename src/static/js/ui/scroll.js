define(['core/events', 'window'],
    function(events, win) {

    'use strict';

    var doc = win.document;

    win.onscroll = function(event) {
        if ((win.innerHeight + win.scrollY) >= doc.body.offsetHeight) {
            events.dispatch('scrolled-to-bottom');
        }
    };

});