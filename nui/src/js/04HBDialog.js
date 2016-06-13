NUI.NUIArtTips = NUI.NUIAtrSubmit = function(options){
	var options = options||{},
		_options = {};
	_options.fixed = true;
	_options = $.extend(_options, options);
	_options.lock = true;
	art.dialog(_options);
}

NUI.NUIAtrIframe = function(options){
	var options = options||{},
		_options = {};
	_options.width = '800px',
	_options.height = '400px',
	_options.fixed = true;
	_options = $.extend(_options, options);
	_options.lock = true;
	_options.content = '<iframe width="100%" height="100%" frameborder="0" src="'+_options.content+'"></iframe>'
	art.dialog(_options);
}