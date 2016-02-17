/*
 * @author: yunqian
 * @mail: yunqian@meilishuo.com
 */
(function (doc, win) {
    var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        revise_mate = use_screen_base.indexOf('_mate'),
        base_size = parseInt(use_screen_base),
        docE = doc.documentElement,
        recalc = function () {
            var triggerRepaints = docE.clientWidth;
            var clientWidth = win.innerWidth;
            docE.style.fontSize = 100 * (clientWidth / base_size) + 'px';
        };

    if(/iPad.*OS|iPhone.*OS/.test(navigator.userAgent) && revise_mate > 0){
        var viewport_meta = doc.querySelectorAll('meta[name=viewport]');
        var devicePixelRatio = win.devicePixelRatio;
        devicePixelRatio = devicePixelRatio != 1 ? 2 : 1;
        viewport_meta[0] && viewport_meta[0].setAttribute('content', 'width=device-width, user-scalable=no, minimum-scale=' + (1 / devicePixelRatio) + ', maximum-scale=' + (1 / devicePixelRatio) + ', initial-scale=' + (1 / devicePixelRatio));
    }

    recalc();
    win.addEventListener(resizeEvt, recalc, false);
    delete use_screen_base;
})(document, window);

/*
 * from page :
    http://isux.tencent.com/web-app-rem.html
    http://www.ghugo.com/mobile-h5-fluid-layout-for-iphone6/
    http://html-js.com/article/Like-the-winter-flexible-design-and-implementation-of-the-mobile-phone-Taobao-cold
    【target-densitydpi=device-dpi】http://stackoverflow.com/questions/2909080/android-webview-seems-to-ignore-viewport-information-on-web-pages

 */
