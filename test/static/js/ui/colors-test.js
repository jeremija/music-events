define(['ui/colors', 'jquery'], function(colors, $) {
	'use strict';

	describe('test/js/ui/colors-test.js', function() {

		describe('palette()', function() {
			var PRIMARY_1 = '#fff',
				PRIMARY_2 = '#eee',
				PRIMARY_3 = '#ddd',
				PRIMARY_4 = '#ccc',
				PRIMARY_5 = '#bbb',
				PRIMARY_6 = '#aaa';
			var SECONDARY_1 = '#555',
				SECONDARY_2 = '#444',
				SECONDARY_3 = '#333',
				SECONDARY_4 = '#222',
				SECONDARY_5 = '#111',
				SECONDARY_6 = '#000';

			var $style, $el1, $el2;

			before(function() {
				$style = $('<style>').attr('type', 'text/css').text(
					'.color-primary-1 { color: ' + PRIMARY_1 + '; } ' +
					'.color-primary-2 { color: ' + PRIMARY_2 + '; } ' +
					'.color-primary-3 { color: ' + PRIMARY_3 + '; } ' +
					'.color-primary-4 { color: ' + PRIMARY_4 + '; } ' +
					'.color-primary-5 { color: ' + PRIMARY_5 + '; } ' +
					'.color-primary-6 { color: ' + PRIMARY_6 + '; } ' +
					'.color-secondary-1 { color: ' +  SECONDARY_1 + '; } ' +
					'.color-secondary-2 { color: ' +  SECONDARY_2 + '; } ' +
					'.color-secondary-3 { color: ' +  SECONDARY_3 + '; } ' +
					'.color-secondary-4 { color: ' +  SECONDARY_4 + '; } ' +
					'.color-secondary-5 { color: ' +  SECONDARY_5 + '; } ' +
					'.color-secondary-6 { color: ' +  SECONDARY_6 + '; }'
				).appendTo($('head'));

				$el1 = $('<span>');
				$el2 = $('<span>');
			});
			after(function() {
				$style.remove();
			});

			function compareColors(color1, color2) {
				// expect(color1).to.be.a('string');
				// expect(color1.length).to.be.greaterThan(0);
				// expect(color2).to.be.a('string');
				// expect(color2.length).to.be.greaterThan(0);

				var c1 = $el1.css('color', color1).css('color'),
					c2 = $el2.css('color', color2).css('color');
				// expect(c1).to.be.a('string');
				// expect(c1.length).to.be.greaterThan(0);
				// expect(c2).to.be.a('string');
				// expect(c2.length).to.be.greaterThan(0);

				expect(c1).to.be(c2);
			}

			it('should return color palette', function() {
				var palette = colors.palette();
				expect(palette).to.only.have.keys('primary', 'secondary');

				var p = palette.primary,
					s = palette.secondary;

				compareColors(p[0], PRIMARY_1);
				compareColors(p[1], PRIMARY_2);
				compareColors(p[2], PRIMARY_3);
				compareColors(p[3], PRIMARY_4);
				compareColors(p[4], PRIMARY_5);
				compareColors(p[5], PRIMARY_6);

				compareColors(s[0], SECONDARY_1);
				compareColors(s[1], SECONDARY_2);
				compareColors(s[2], SECONDARY_3);
				compareColors(s[3], SECONDARY_4);
				compareColors(s[4], SECONDARY_5);
				compareColors(s[5], SECONDARY_6);
			});
		});

	});

});