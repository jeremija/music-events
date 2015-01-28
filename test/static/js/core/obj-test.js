define(['core/obj'], function(obj) {
    'use strict';

    describe('test/js/core/obj-test.js', function() {
        describe('each()', function() {
            it('should iteratate through array\'s properties', function() {
                var arr = ['first', 'second', 'third'];

                var results = [];
                obj.each(arr, function(item, index) {
                    results.push({
                        item: item,
                        index: index
                    });
                });

                expect(results.length).to.be(3);
                expect(results[0].index).to.be(0);
                expect(results[0].item).to.be('first');

                expect(results[1].index).to.be(1);
                expect(results[1].item).to.be('second');

                expect(results[2].index).to.be(2);
                expect(results[2].item).to.be('third');
            });

            it('should iterate through object\'s own properties', function() {
                var myObject = Object.create({
                    hidden: 1
                });

                myObject.prop1 = 'first';
                myObject.prop2 = 'second';
                myObject.fcn = function() {};

                var results = [];
                obj.each(myObject, function(item, index) {
                    results.push({
                        item: item,
                        index: index
                    });
                });

                expect(results.length).to.be(3);

                expect(results[0].index).to.be('prop1');
                expect(results[0].item).to.be(myObject.prop1);

                expect(results[1].index).to.be('prop2');
                expect(results[1].item).to.be(myObject.prop2);

                expect(results[2].index).to.be('fcn');
                expect(results[2].item).to.be(myObject.fcn);
            });
        });
        describe('copy()', function() {
            it('should copy properties from one object to another', function() {
                var dest = {
                    a: 1,
                    b: 2,
                    c: 3
                };

                var ret = obj.copy(dest, {
                    b: 4,
                    d: 5
                });

                expect(ret).to.be(dest);
                expect(dest.a).to.be(1);
                expect(dest.b).to.be(4);
                expect(dest.c).to.be(3);
                expect(dest.d).to.be(5);
            });
        });
        describe('create()', function() {
            it('should create a new object with proto and props', function() {
                var proto = {
                    a: 1,
                    toString: function() {
                        return 'test';
                    }
                };

                var props = {
                    a: 2,
                    b: 3
                };

                var newObject = obj.create(props, proto);

                expect(proto.isPrototypeOf(newObject)).to.be(true);
                expect(newObject.a).to.be(2);
                expect(newObject.b).to.be(3);
                expect(newObject.toString()).to.be('test');
            });
        });

        describe('isArray()', function() {
            it('should return true if arg is array', function() {
                expect(obj.isArray([])).to.be(true);
            });
            it('should return false if arg is not an array', function() {
                expect(obj.isArray({})).to.be(false);
                expect(obj.isArray(1)).to.be(false);
                expect(obj.isArray('test')).to.be(false);
                expect(obj.isArray('')).to.be(false);
                expect(obj.isArray(undefined)).to.be(false);
                expect(obj.isArray(null)).to.be(false);
                expect(obj.isArray(false)).to.be(false);
                expect(obj.isArray()).to.be(false);
            });
        });

        describe('read()', function() {
            it('should throw errors if arguments are falsy', function() {
                expect(function() {
                    obj.read();
                }).to.throwError();
                expect(function() {
                    obj.read(undefined);
                }).to.throwError();
                expect(function() {
                    obj.read(undefined);
                }).to.throwError();
            });
            it('should throw error if property is not a string', function() {
                expect(function() {
                    obj.read({}, 0);
                }).to.throwError();
            });
            it('should read object\'s properties', function() {
                var myObject = {
                    key1: 1,
                    key2: 2,
                    key3: 3
                };

                expect(obj.read(myObject, 'key2')).to.be(2);
            });
            it('should read object\'s nested properties', function() {
                var myObject = {
                    key1: {
                        key2: {
                            key3: 3,
                            key4: 4,
                            key5: 5
                        },
                        key6: {
                            key7: 7,
                            key8: 8
                        },
                    },
                    key9: {
                        key10: 10,
                        key11: 11
                    }
                };

                expect(obj.read(myObject, 'key1.key6')).to.eql({
                    key7: 7,
                    key8: 8
                });

                expect(obj.read(myObject, 'key1.key6.key7')).to.be(7);
            });
        });
    });

});