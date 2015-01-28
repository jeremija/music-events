define(['bind/Collector'], function(Collector) {
    'use strict';

    function collector() {
        var disposables = [];

        function collect(observable) {
            return new Collector(disposables, observable);
        }

        collect.dispose = function() {
            disposables = disposables.filter(function(disposable) {
                disposable.dispose();
                return false;
            });
        };

        return collect;
    }

    return collector;

});