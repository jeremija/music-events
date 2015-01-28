require(['Squire', 'test/config/dependencyTree'],
    function(Squire, depTree)
{
    'use strict';

    var isPhantomJS = !!window.mochaPhantomJS,
        logEnabled = !isPhantomJS;

    var squireRequire = Squire.prototype.require;

    var injectCount = 0;
    Squire.prototype.require = function(deps, factory) {
        injectCount++;
        squireRequire.call(this, deps, function() {
            factory.apply(null, arguments);
            injectCount--;
            if (injectCount === 0) {
                if (logEnabled) console.log('all callbacks completed');
                run();
            }
        });
    };

    mocha.setup('bdd')
        .globals(['jQuery*'])
        // .enableTimeouts(false)
        .checkLeaks();

    function run() {
        if (!testsLoaded || injectCount > 0) return;

        if (isPhantomJS) {
            mochaPhantomJS.run();
        }
        else {
            if (logEnabled) console.log('running tests');
            mocha.run();
        }
    }

    var testsLoaded = false;
    require(tests, function() {
        if (logEnabled) console.log('all tests loaded');
        testsLoaded = true;
        run();
    });

});