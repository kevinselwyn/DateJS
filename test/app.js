/*globals document, window*/

(function (document, window, undefined) {
	"use strict";

	var check = {
		vars: {
			a: [],
			b: [],
			check: []
		},
		setup: function () {
			var td = document.getElementsByTagName("td"), i = 0, l = 0,
				a = [], b = [], check = [];

			for (i = 0, l = td.length; i < l; i += 1) {
				switch (td[i].className) {
				case "a":
					a.push(td[i]);
					break;
				case "b":
					b.push(td[i]);
					break;
				case "check":
					check.push(td[i]);
					break;
				default:
					break;
				}
			}

			this.vars.a = a;
			this.vars.b = b;
			this.vars.check = check;

			return this;
		},
		check: function () {
			var a = this.vars.a, b = this.vars.b, a_val = "", b_val = "",
				i = 0, l = 0, check = this.vars.check;

			for (i = 0, l = a.length; i < l; i += 1) {
				a_val = a[i].childNodes[0].nodeValue;
				b_val = b[i].childNodes[1].nodeValue;

				if (a_val !== b_val) {
					a[i].style.background = "red";
					b[i].style.background = "red";
					check[i].className = ["check", "error"].join(" ");
				} else {
					check[i].className = ["check", "success"].join(" ");
				}
			}
		},
		init: function () {
			this.setup().check();
		}
	};

	window.onload = function () {
		check.init();
	};
}(document, window));