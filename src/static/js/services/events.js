define(['core/xhr/http', 'params/get', 'moment'], function(http, get, moment) {
    'use strict';

    function parseDate(dateString) {
        if (!dateString) return dateString;
        dateString.substring(4);
        return moment(dateString.substring(5), 'D MMM YYYY HH:mm:ss');
    }

    function tagsToString(tags) {
        var tag = tags && tags && tags.tag;
        return tag && tag.join && tag.join(', ') || tag;
    }

    function readImage(image) {
        return image && image['#text'];
    }

    function getImage(event) {
        return readImage(event.image[3]) || readImage(event.image[2]) ||
            readImage(event.image[1]) || readImage(event.image[0]);
    }

    function mapEvent(event) {
        var moment = parseDate(event.startDate);
        return {
            title: event.title,
            artists: event.artists,
            description: event.description,
            tags: event.tags,
            tagsText: tagsToString(event.tags),
            website: event.website,

            // transparent gif will be set if no image
            image: getImage(event) || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',

            venueName: event.venue.name,
            venueLat: event.venue.location['geo:point']['geo:lat'],
            venueLng: event.venue.location['geo:point']['geo:long'],
            venueCity: event.venue.location.city,
            venueCountry: event.venue.location.country,
            venueStreet: event.venue.location.street,
            venuePostalCode: event.venue.location.postalcode,

            startDate: moment.toDate(),
            date: moment.format('YYYY-MM-DD')
        };
    }

    var exports = {
        search: function(params) {
            return http.get(get.format('/api/events', params)).data()
                .then(function(data) {
                    var events = data.events.event;
                    return {
                        '@attr': data.events['@attr'],
                        events: events.map(mapEvent)
                    };
                });
        }
    };

    return exports;

});