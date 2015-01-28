define(['bootstrap', 'bindingHandlers/index', 'templates/index', 'config',
    'bind/binder', 'pages/index', 'log', 'ui/scroll'],
    function(bootstrap, koIndex, koTemplates, config,
        binder, pageIndex, log, scroll)
{
    'use strict';

    var pageId = window.location.pathname;
    pageIndex.init(pageId);
});