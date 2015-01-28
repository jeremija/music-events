define(['bind/binder',
	'pages/index.html'
	], function(binder)
{
	'use strict';
	var pages = Array.prototype.slice.call(arguments);
	pages.shift();

	return {
		find: function(pageId) {
			var found;
			pages.some(function(page, index) {
				if (!page) throw new Error('page undefined, index: ' + index);
				if (page.id !== pageId) return false;
				found = page;
				return true;
			});
			return found;
		},
		init: function(pageId) {
			var page = this.find(pageId);
			if (!page) {
				throw new Error('page module not found for id: ' + pageId);
			}
			page.init();
			binder.apply(page.vm, document.getElementById('content'));
		}
	};
});