define(['bind/binder', 'services/events', 'moment', 'core/events'],
    function(binder, events, moment, internalEvents) {
    'use strict';

    function groupByDates(previousEvents, events) {
        var groupedEvents = previousEvents || [];
        var group = groupedEvents[groupedEvents.length - 1];
        events.forEach(function(event) {
            if (!group || group.date !== event.date) {
                group = {
                    date: event.date,
                    events: [event]
                };
                groupedEvents.push(group);
                return;
            }
            group.events.push(event);
        });
        return groupedEvents;
    }

    var lastArgs = {
        // location: 'Amsterdam',
        limit: 60,
        page: 0
    };

    var exports = {
        id: '/index.html',
        vm: {
            search: {
                location: binder.observable(),
                tag: binder.observable(),
                km: binder.observable(),
                kms: binder.observableArray([2, 5, 10, 20, 50, 100]),
                submit: function() {
                    var self = this.search;
                    lastArgs = {
                        page: 0,
                        limit: 60
                    };
                    if (self.location()) lastArgs.location = self.location();
                    if (self.km()) lastArgs.distance = self.km();
                    if (self.tag()) lastArgs.tag = self.tag();
                    lastArgs.page = 0;
                    this.groupedEvents([]);
                    this.loadMore();
                    return false;
                }
            },
            selected: binder.observable(),
            lastSelected: binder.observable(),
            select: function(item) {
                this.lastSelected(this.selected());
                this.selected(this.selected() === item ? undefined : item);
            },
            page: binder.observable(),
            totalPages: binder.observable(),
            groupedEvents: binder.observableArray(),
            loading: binder.observable(false),
            loadMore: function() {
                this.loading(true);
                lastArgs.page++;
                var vm = this;
                this.page(lastArgs.page);
                events.search(lastArgs).then(function(data) {
                    vm.totalPages(data['@attr'].totalPages);
                    vm.search.location(data['@attr'].location);
                    vm.groupedEvents(
                        groupByDates(vm.groupedEvents(), data.events));
                }).fin(function() {
                    vm.loading(false);
                }).done();
            },
        },
        init: function() {
            var vm = this.vm;
            vm.loadMoreEnabled = binder.computed(function() {
                return !vm.loading() && vm.page() < vm.totalPages();
            });
            vm.loadMore();
            internalEvents.addListener('scrolled-to-bottom', function() {
                if (!vm.loading() && vm.page() < vm.totalPages()) {
                    vm.loadMore();
                }
            });
        }
    };

    return exports;

});