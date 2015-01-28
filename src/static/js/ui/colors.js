define(['jquery', 'window'], function($, window) {
	'use strict';

	var exports = {
		_colors: undefined,
		palette: function() {
			if (this._colors) return this._colors;

			var $div = $('<div>').css('display', 'none')
				.appendTo(window.document.body);

			var p1 = $('<span>').addClass('color-primary-1').appendTo($div);
			var p2 = $('<span>').addClass('color-primary-2').appendTo($div);
			var p3 = $('<span>').addClass('color-primary-3').appendTo($div);
			var p4 = $('<span>').addClass('color-primary-4').appendTo($div);
			var p5 = $('<span>').addClass('color-primary-5').appendTo($div);
			var p6 = $('<span>').addClass('color-primary-6').appendTo($div);
			var s1 = $('<span>').addClass('color-secondary-1').appendTo($div);
			var s2 = $('<span>').addClass('color-secondary-2').appendTo($div);
			var s3 = $('<span>').addClass('color-secondary-3').appendTo($div);
			var s4 = $('<span>').addClass('color-secondary-4').appendTo($div);
			var s5 = $('<span>').addClass('color-secondary-5').appendTo($div);
			var s6 = $('<span>').addClass('color-secondary-6').appendTo($div);

			var colors = this._colors = {
				primary: [
					p1.css('color'), p2.css('color'), p3.css('color'),
					p4.css('color'), p5.css('color'), p6.css('color')
				],
				secondary: [
					s1.css('color'), s2.css('color'), s3.css('color'),
					s4.css('color'), s5.css('color'), s6.css('color')
				]
			};

			$div.remove();

			return colors;
		}
	};

	return exports;

});