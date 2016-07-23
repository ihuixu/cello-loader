(function (doc, win) {
	var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
	base_size = parseInt(use_screen_base),
	docE = doc.documentElement,
	recalc = function () {
		var triggerRepaints = docE.clientWidth;
		var clientWidth = win.innerWidth;
		docE.style.fontSize = 100 * (clientWidth / base_size) + 'px';
	};

	recalc();
	win.addEventListener(resizeEvt, recalc, false);
	delete use_screen_base;
})(document, window);

