define(['bind/collector', 'bind/Collector', 'ko'],
    function(collector, Collector, ko)
{
    'use strict';

    describe('test/js/bind/collector-test.js', function() {

        describe('collector()', function() {
            var collect;
            before(function() {
                collect = collector();
            });
            it('should return a function', function() {
                expect(collector).to.be.a('function');
            });
        });

        describe('collector().collect()', function() {
            var collect;
            before(function() {
                collect = collector();
            });
            it('should have function dispose', function() {
                expect(collect).to.only.have.keys('dispose');
                expect(collect.dispose).to.be.a('function');
            });
            it('should return a new Collector instance', function() {
                var c1 = collect();
                expect(c1).to.be.a(Collector);

                var c2 = collect();
                expect(c1._disposables).to.be.an('array');
                expect(c1._disposables).to.be(c2._disposables);

                var c3 = collector()();
                expect(c3._disposables).to.be.an('array');
                expect(c3._disposables).to.not.be(c1._disposables);
            });
            it('should throw error if arg1 is not observable', function() {
                expect(function() {
                    collect({});
                }).to.throwError(/observable must be an observable if defined/);
            });
            it('should set observable', function(){
                var o = ko.observable();
                var c4 = collect(o);
                expect(c4._observable).to.be(o);
            });
        });

        describe('dispose()', function() {
            var collect;
            before(function() {
                collect = collector();
            });
            it('should call dispose of all instances', function() {
                var o1 = ko.observable(),
                    o2 = ko.observableArray();

                var context = {};

                collect(o1).subscribe(function(val) {
                    this.o1 = val;
                }, context);

                collect(o2).subscribe(function(val) {
                    this.o2 = val;
                }, context);

                var o3 = collect().computed(function() {
                    return o1() + o2()[0];
                });

                o1(1);
                o2.push(2);

                expect(context.o1).to.be(1);
                expect(context.o2).to.eql([2]);
                expect(o3()).to.eql(3);

                // test begins here
                collect.dispose();

                o1(3);
                o2(4);

                expect(context.o1).to.be(1);
                expect(context.o2).to.eql([2]);
                expect(o3()).to.eql(3);
            });
        });

    });

});