define(['ko', 'core/assert'], function(ko, assert) {
	'use strict';

	describe('test/js/core/assert-test.js', function() {

		describe('isObservable()', function() {
			var value;
			it('should throw error when...', function() {
				value = 0;
				expect(function() {
					assert.isObservable(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be(
						'Expected value to be an observable');
				});
			});
			it('should not throw error when value is observable', function() {
				value = ko.observable();
				assert.isObservable(value);
			});
		});
		describe('isObservableArray()', function() {
			var value;
			it('should throw error when value not an observable', function() {
				value = {};
				expect(function() {
					assert.isObservableArray(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be(
						'Expected value to be an observableArray');
				});
			});
			it('should throw error when value is an observable', function() {
				value = ko.observable();
				expect(function() {
					assert.isObservableArray(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be(
						'Expected value to be an observableArray');
				});
			});
			it('should not throw error when observableArray', function() {
				value = ko.observableArray();
				assert.isObservableArray(value);
			});
		});
		describe('isInstanceOf', function() {
			var value;
			it('should throw error if value not instance of', function() {
				var input = {};
				expect(function() {
					assert.isInstanceOf(input, HTMLElement);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be an ' +
						'instance of ' + HTMLElement.name);
				});
			});
			it('should not throw error when is instance of', function() {

				var input = document.createElement('input');
				assert.isInstanceOf(input, HTMLElement);
				assert.isInstanceOf(input, HTMLInputElement);
			});
		});
		describe('isTruthy()', function() {
			var value;
			it('should throw error when value is not truthy', function() {
				value = 0;
				expect(function() {
					assert.isTruthy(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be truthy');
				});
			});
			it('should not throw error when value is truthy', function() {
				value = {};
				assert.isTruthy(value);
			});
		});
		describe('isFalsy()', function() {
			var value;
			it('should throw error when value is not falsy', function() {
				value = 1;
				expect(function() {
					assert.isFalsy(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be falsy');
				});
			});
			it('should not throw error when value is falsy', function() {
				value = 0;
				assert.isFalsy(value);
			});
		});
		describe('isObject()', function() {
			var value;
			it('should throw error when value is not an object', function() {
				value = 'test';
				expect(function() {
					assert.isObject(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be an object');
				});
			});
			it('should not throw error when', function() {
				value = {};
				assert.isObject(value);
			});
		});
		describe('isNumber()', function() {
			var value;
			it('should throw error when value is not a number', function() {
				value = 'test';
				expect(function() {
					assert.isNumber(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be a number');
				});
			});
			it('should not throw error when value is number', function() {
				value = 0;
				assert.isNumber(value);
			});
		});
		describe('isString()', function() {
			var value;
			it('should throw error when value is not a string', function() {
				value = 123;
				expect(function() {
					assert.isString(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be a string');
				});
			});
			it('should not throw error when value is a string', function() {
				value = 'test';
				assert.isString(value);
			});
		});
		describe('hasText()', function() {
			var value;
			it('should throw error when value is not a string', function() {
				expect(function() {
					assert.hasText(123);
				}).to.throwError(/Expected value to be a non-empty string/);
			});
			it('should throw error when value is an empty string', function() {
				expect(function() {
					assert.hasText('');
				}).to.throwError(/Expected value to be a non-empty string/);
			});
			it('should not throw error when string has length', function() {
				assert.hasText('a');
			});
		});
		describe('isArray()', function() {
			var value;
			it('should throw error when value is not an array', function() {
				value = {};
				expect(function() {
					assert.isArray(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be an array');
				});
			});
			it('should not throw error when value is an array', function() {
				value = [];
				assert.isArray(value);
			});
		});
		describe('notEmpty()', function() {
			var value;
			it('should throw error when value is not an array', function() {
				value = {};
				expect(function() {
					assert.notEmpty(value);
				}).to.throwError(function(e) {
					expect(e).to.be.an(Error);
					expect(e.message).to.be(
						'Expected value to be a non-empty array');
				});
			});
			it('should throw error when value is not an array', function() {
				value = [];
				expect(function() {
					assert.notEmpty(value);
				}).to.throwError(function(e) {
					expect(e).to.be.an(Error);
					expect(e.message).to.be(
						'Expected value to be a non-empty array');
				});
			});
			it('should not throw error when non-empty array', function() {
				value = [1];
				assert.notEmpty(value);
			});
		});
		describe('isFunction()', function() {
			var value;
			it('should throw error when value is not a function', function() {
				value = {};
				expect(function() {
					assert.isFunction(value);
				}).to.throwError(function(e) {
					expect(e).to.be.a(TypeError);
					expect(e.message).to.be('Expected value to be a function');
				});
			});
			it('should not throw error when value is a function', function() {
				value = function() {};
				assert.isFunction(value);
			});
		});

	});

});