/*globals document, require, requirejs, window*/

(function (document, window, undefined) {
	"use strict";

	requirejs.config({
		baseUrl: ".",
		paths: {
			"datejs": "../dist/DateJS.min"
		}
	});

	require(["datejs"], function (DateJS) {
		var format = document.getElementById("format").getElementsByTagName("input")[0],
			output = document.getElementById("output").getElementsByTagName("p")[0],
			d = new DateJS(), update = function () {
				output.innerHTML = d.date(format.value);
			}, vars = {};

		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
			vars[key] = decodeURIComponent(value).replace(/\+/g, " ");
		});

		if (vars.f) {
			format.value = vars.f;
		}

		update();

		format.onkeyup = function () {
			update();
		};
	});
}(document, window));