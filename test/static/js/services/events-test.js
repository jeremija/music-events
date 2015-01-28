define(['Squire', 'test/js/core/xhr/XMLHttpRequestMock'],
    function(Squire, XMLHttpRequestMock)
{
    'use strict';

    var mock = {
        "id": "4000493",
        "title": "Arhythmia",
        "artists": {
            "artist": "Arhythmia",
            "headliner": "Arhythmia"
        },
        "venue": {
            "id": "10288005",
            "name": "We Rock",
            "location": {
                "geo:point": {
                    "geo:lat": "40.419647",
                    "geo:long": "-3.708111"
                },
                "city": "Madrid",
                "country": "Spain",
                "street": "Costanilla de los \u00c1ngeles, 20",
                "postalcode": "28013"
            },
            "url": "http:\/\/www.last.fm\/venue\/10288005+We+Rock",
            "website": "http:\/\/www.werock.es\/",
            "phonenumber": "915 428 193",
            "image": [{
                "#text": "http:\/\/userserve-ak.last.fm\/serve\/34\/85295059.jpg",
                "size": "small"
            }, {
                "#text": "http:\/\/userserve-ak.last.fm\/serve\/64\/85295059.jpg",
                "size": "medium"
            }, {
                "#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/85295059.jpg",
                "size": "large"
            }, {
                "#text": "http:\/\/userserve-ak.last.fm\/serve\/252\/85295059.jpg",
                "size": "extralarge"
            }, {
                "#text": "http:\/\/userserve-ak.last.fm\/serve\/_\/85295059\/We+Rock+werock.jpg",
                "size": "mega"
            }]
        },
        "startDate": "Sun, 25 Jan 2015 21:40:01",
        "description": "",
        "image": [{
            "#text": "http:\/\/userserve-ak.last.fm\/serve\/34\/67100522.jpg",
            "size": "small"
        }, {
            "#text": "http:\/\/userserve-ak.last.fm\/serve\/64\/67100522.jpg",
            "size": "medium"
        }, {
            "#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/67100522.jpg",
            "size": "large"
        }, {
            "#text": "http:\/\/userserve-ak.last.fm\/serve\/252\/67100522.jpg",
            "size": "extralarge"
        }],
        "attendance": "1",
        "reviews": "0",
        "tag": "lastfm:event=4000493",
        "url": "http:\/\/www.last.fm\/event\/4000493+Arhythmia+at+We+Rock+on+25+January+2015",
        "website": "",
        "tickets": "\n  ",
        "cancelled": "0",
        "tags": {
            "tag": ["italian", "nu metal", "metal", "sardinian"]
        }
    };

    new Squire().mock({
        'core/xhr/XMLHttpRequest': XMLHttpRequestMock
    }).require(['services/events'], function(events) {
        describe('test/js/services/events-test.js', function(done) {
            before(function() {
                XMLHttpRequestMock.mock('GET', '/api/events?location=Amsterdam')
                    .response({
                        data: {
                            events: {
                                event: [mock],
                                '@attr': {}
                            },
                        }
                    });
            });
            after(function() {

            });
            it('should fetch events from server', function(done) {
                events.search({
                    location: 'Amsterdam'
                }).then(function(data) {
                    expect(data.events).to.be.an('array');
                    expect(data['@attr']).to.be.an('object');
                    done();
                }).done();
            });
        });
    });

});