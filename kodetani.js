	'use strict';

    if (typeof jQuery === "undefined") {

        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-latest.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

	var _pushassist = {};

	_pushassist.appkey		= "AIzaSyAExvLquLphb8ImrLNOz_jo_3F47n__LuQ";
	_pushassist.serverUrl	= "https://api2.pushassist.com";
	_pushassist.Url			= "https://codebaruada.pushassist.com";
	_pushassist.assetsURL	= "https://cdn.pushassist.com/account";
	_pushassist.subdomain	= "codebaruada";
	_pushassist.safariWebsitePushId = "web.com.pushassist.push";

    var _pa;

	var allow = 'Allow', disallow = 'Don\'t Allow', title = ' Would Like to Send You Push Notifications.', subtitle = 'Notifications can be turned off anytime from browser settings.', powered_by_text = 'Powered by PushAssist';

	var subdomainUrl = "https://"+ _pushassist.subdomain + ".pushassist.com";

	function get_values() {

	    var fontURL = "https://fonts.googleapis.com/css?family=Roboto:400,100,300",
            headfonts = document.getElementsByTagName("head")[0],
            fontlink = document.createElement("link");
        fontlink.rel = "stylesheet", fontlink.href = fontURL, headfonts.appendChild(fontlink);

		var cssUrl = "https://cdn1.pushassist.com/account/css/psa-notification.css",
			headcss = document.getElementsByTagName("head")[0],
			link = document.createElement("link");
			link.type = "text/css", link.rel = "stylesheet", link.href = cssUrl, headcss.appendChild(link);
	}

	function _pa_params() {

        var _pa_out = [], i;

        if (typeof _pa === 'undefined') {
            _pa = [];
        }

        var _length = _pa.length;

        if (_length > 0) {

            for (i=0 ; i<_length; ++i) {

             _pa_out.push(encodeURIComponent(_pa[i]));
            }
            return _pa_out;
        }
    }

	function check_browser_version() {

        var nAgt = navigator.userAgent;
        var verOffset, version, ix, nameOffset, majorVersion;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {

            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {

            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {

            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {

            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {

            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {

            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {

            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {

            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {

            version = nAgt.substring(verOffset + 1);
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);

        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        return majorVersion;	//browser version
    }

    function check_browser() {

        var nAgt = navigator.userAgent;
        var verOffset, nameOffset, browser;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Edge';
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Explorer';
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Internet Explorer 11';
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);

            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }

        return browser;
    }

    function browser_compatible() {

        if ("Chrome" === check_browser()) {

            return "Notification" in window && "serviceWorker" in navigator && "showNotification" in ServiceWorkerRegistration.prototype && "PushManager" in window && check_browser_version() >= 42 ? !0 : !1;

        } else if ("Opera" === check_browser()) {

            return "Notification" in window && "serviceWorker" in navigator && "showNotification" in ServiceWorkerRegistration.prototype && "PushManager" in window && check_browser_version() >= 42 ? !0 : !1;

        } else if ("Firefox" === check_browser()) {

            return check_browser_version() > 43 ? !0 : !1;

        } else if ("Safari" === check_browser()) {

            return "safari" in window && "pushNotification" in window.safari ? !0 : !1;

        } else if ("Edge" === check_browser()) {

            return check_browser_version() > 13 ? !0 : !1;
        }
    }

	function setCookie(name, value, exdays) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * exdays * 60 * 60 * 1e3);
        var a = "; expires=" + n.toUTCString();
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + a + "; path=/"
	}

	function getCookie(name){
        for (var i = name + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
            for (var a = t[n];
                " " == a.charAt(0);) a = a.substring(1);
            if (0 == a.indexOf(i)) return a.substring(i.length, a.length)
        }
        return ""
	}
	
	function openFBpopup(url, elm) {
        var new_fbwindow = window.open(url, "", "width=800,height=600");
        new_fbwindow.onbeforeunload = function () {
            setCookie("psa_fb_status", "1", 14);
            jQuery(elm).hide();
        }
    }
        
    window.onload = function() {
        var is_cookie_set = getCookie("psa_fb_status");
        if(is_cookie_set !== ''){
            jQuery('.psa_fb_login').hide();
        }
    }

	function notificationPopup() {

	    jQuery("body").append('<div class="pushassist_notification8 top_center"><div class="pushassist_notification8_inner_wraper" id="pushassist_notification_inner_wraper"> <div class="pushassist_notification8_image_wraper"> <img src="https://i.imgur.com/at3Fm42.png"> </div> <div class="pushassist_notification8_text_wraper"> <span class="pushassist_notification8_title"> <strong> <span class="camelize"> '+ _pushassist.subdomain +'</span></strong> ' + title + ' </span> <p class="pushassist_notification8_message"> ' + subtitle +' </p> </div> <div class="pushassist_notification8_footer_wraper"> <a class="pushassist8_branding" target="_blank" href="https://pushassist.com/"> <img src="https://i.imgur.com/JB1FzMC.png"> </a> <span><a class="pushassist8_powered_by" target="_blank" href="https://pushassist.com/">' + powered_by_text + '</a></span> <div class="pushassist8_button_wrapper"> <button class="pushassist8_btn_close" id="psa_close">'+ disallow +'</button> <button class="pushassist8_btn_allow" id="psa_allow">' + allow + '</button></div> </div> </div> </div>');

		document.getElementById("psa_close").addEventListener("click", function() {

			setCookie("pushassist_notification_status", "block", 1e4);

			var n = document.getElementById("pushassist_notification_inner_wraper");
			n.parentNode.remove(n);
		});

		document.getElementById("psa_allow").addEventListener("click", function() {

			var n = document.getElementById("pushassist_notification_inner_wraper");
			n.parentNode.remove(n);

			var ScreenLeft = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
				ScreenTop = void 0 !== window.screenTop ? window.screenTop : screen.top,
				thisWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
				thisHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
				W = 550,
				H = 450,
				l = thisWidth / 2 - W / 2 + ScreenLeft,
				t = thisHeight / 2 - H / 2 + ScreenTop,
				subWindow;

				if(undefined === _pa_params()) {

					subWindow = window.open(subdomainUrl, "_blank", "scrollbars=yes, width=" + W + ", height=" + H + ", top=" + t + ", left=" + l);
				} else {

					subWindow = window.open(subdomainUrl + '?segment=' + _pa_params(), "_blank", "scrollbars=yes, width=" + W + ", height=" + H + ", top=" + t + ", left=" + l);
				}

				return subWindow ? (subWindow.focus(), subWindow.height <= 0 ? !1 : !0) : void 0
		});
	}

	function show_notification_child_window() {

        var ScreenLeft = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
            ScreenTop = void 0 !== window.screenTop ? window.screenTop : screen.top,
            thisWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            thisHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            W = 550,
            H = 450,
            l = thisWidth / 2 - W / 2 + ScreenLeft,
            t = thisHeight / 2 - H / 2 + ScreenTop,
            subWindow;

            if(undefined === _pa_params()) {

                subWindow = window.open(subdomainUrl, "_blank", "scrollbars=yes, width=" + W + ", height=" + H + ", top=" + t + ", left=" + l);
            } else {

                subWindow = window.open(subdomainUrl + '?segment=' + _pa_params(), "_blank", "scrollbars=yes, width=" + W + ", height=" + H + ", top=" + t + ", left=" + l);
            }

            return subWindow ? (subWindow.focus(), subWindow.height <= 0 ? !1 : !0) : void 0
	}

	/* getting data from child window */

	function getChildWindowMessage(storeData) {

		jQuery.each(storeData, function(key, value) {
			"new_user" !== key && setCookie(key, value, 1e4);
			setCookie(key, value, 1e4);
		});
	}

	function getOrigin(data) {
		var a = document.createElement("a");
		return a.href = data, a.hostname;
	}

	window.addEventListener("message", function(e) {

		return getOrigin(e.origin) !== getOrigin(subdomainUrl) ? !1 : void("block" === e.data ? (setCookie("pushassist_notification_status", "block", 1e4), setCookie("pushassist_key", "", -1)) : getChildWindowMessage(e.data));
	});

	/* end */

	self.addEventListener("load", function() {

		get_values(); // include manifest.json on page load

        var pushassist_prompt = document.getElementsByClassName('psa_show_notification_opt_in');

		if (pushassist_prompt.length === 0) {

            if(!0 === browser_compatible()){

               "subscribe" === getCookie("pushassist_notification_status") || "block" === getCookie("pushassist_notification_status") ? void 0 : notificationPopup();

            } else {

                console.warn("This browser does not support push notification.");
            }
        } else {

			 for (var i = 0; i < pushassist_prompt.length; i++) {

				 pushassist_prompt[i].addEventListener('click', function () {

					 "subscribe" === getCookie("pushassist_notification_status") || "block" === getCookie("pushassist_notification_status") ? void 0 : show_notification_child_window();
				 });
			 }
		}

	});
