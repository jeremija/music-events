var require = {
    paths: {
        // 'Extendable': '../bower/extendable.js/dist/extendable',

        'jquery': '../bower/jquery/dist/jquery',
        'bootstrap': '../bower/bootstrap/dist/js/bootstrap',
        'ko': '../bower/knockoutjs/dist/knockout.debug',
        'moment': '../bower/moment/moment',
        'numeral': '../bower/numeraljs/numeral',
        'pace': '../bower/pace/pace',
        'text': '../bower/requirejs-text/text',
        'q': '../bower/q/q'
    },

    map: {
        '*': {
            //enable jquery's no conflict mode
            'jquery' : 'require/jquery-private',
        },
        'require/jquery-private': {
            'jquery': 'jquery'
        }
    },

    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
    }
};