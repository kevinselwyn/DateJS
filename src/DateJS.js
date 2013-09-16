/*
 * DateJS
 *
 *
 * DateJS is a Javascript port of the native date() function in PHP
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*globals console, DateJS, document, window*/

(function (document, window, undefined) {
	"use strict";

	var DateJS = function () {
		return true;
	};
		
	DateJS.prototype = {
/* -------------------------------- *\
	$VARS
\* -------------------------------- */
		vars: {
			date: new Date(),
			str: {
				month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				week: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"]
			}
		},
		pad: function (str, len) {
			str = String(str);
			while (str.length < len) {
				str = ["0", str].join("");
			}

			return str;
		},
/* -------------------------------- *\
	$DAY
\* -------------------------------- */
		d: function () {
			/* Day of the month, 2 digits with leading zeros */
			/* 01 to 31 */
			var j = this.j();

			return (j < 10) ? ["0", j].join("") : j;
		},
		D: function () {
			/* A textual representation of a day, three letters */
			/* Mon through Sun */
			return this.l().substr(0, 3);
		},
		j: function () {
			/* Day of the month without leading zeros */
			/* 1 to 31 */
			return this.vars.date.getDate();
		},
		l: function () {
			/* A full textual representation of the day of the week */
			/* Sunday through Saturday */
			return [this.vars.str.week[this.w()], "day"].join("");
		},
		N: function () {
			/* ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0) */
			/* 1 (for Monday) through 7 (for Sunday) */
			var w = this.w();

			return (w === 0) ? 7 : w;
		},
		S: function () {
			/* English ordinal suffix for the day of the month, 2 characters */
			/* st, nd, rd or th. Works well with j */
			var j = this.j(), suffix = ["th", "st", "nd", "rd"], S = 0;

			if (j < 11 || j > 12) {
				S = ((j % 10) > 3) ? 0 : (j % 10);
			}

			return suffix[S];
		},
		w: function () {
			/* Numeric representation of the day of the week */
			/* 0 (for Sunday) through 6 (for Saturday) */
			return this.vars.date.getDay();
		},
		z: function () {
			/* The day of the year (starting from 0) */
			/* 0 through 365 */
			var start = new Date(this.Y(), 0, 1);

			return Math.ceil(((this.vars.date - start) / 86400000) - 1);
		},
/* -------------------------------- *\
	$WEEK
\* -------------------------------- */
		W: function () {
			/* ISO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0) */
			/* Example: 42 (the 42nd week in the year) */
			return Math.ceil(this.z() / 7);
		},
/* -------------------------------- *\
	$MONTH
\* -------------------------------- */
		F: function () {
			/* A full textual representation of a month, such as January or March */
			/* January through December */
			return this.vars.str.month[this.n() - 1];
		},
		m: function () {
			/* Numeric representation of a month, with leading zeros */
			/* 01 through 12 */
			var n = this.n();

			return (n < 10) ? ["0", n].join("") : n;
		},
		M: function () {
			/* A short textual representation of a month, three letters */
			/* Jan through Dec */
			return this.F().substr(0, 3);
		},
		n: function () {
			/* Numeric representation of a month, without leading zeros */
			/* 1 through 12 */
			return this.vars.date.getMonth() + 1;
		},
		t: function () {
			/* Number of days in the given month */
			/* 28 through 31 */
			return new Date(this.Y(), this.n(), 0).getDate();
		},
/* -------------------------------- *\
	$YEAR
\* -------------------------------- */
		L: function () {
			/* Whether it's a leap year */
			/* 1 if it is a leap year, 0 otherwise. */
			return (new Date(this.Y(), 1, 29).getMonth() === 1) ? 1 : 0;
		},
		o: function () {
			/* SO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0) */
			/* Examples: 1999 or 2003 */
			return this.Y();
		},
		Y: function () {
			/* A full numeric representation of a year, 4 digits */
			/* Examples: 1999 or 2003 */
			return this.vars.date.getFullYear();
		},
		y: function () {
			/* A two digit representation of a year */
			/* Examples: 99 or 03 */
			return [this.Y(), ""].join("").substr(2, 2);
		},
/* -------------------------------- *\
	$TIME
\* -------------------------------- */
		a: function () {
			/* Lowercase Ante meridiem and Post meridiem */
			/* am or pm */
			var G = this.G();

			return (G > 12) ? "pm" : "am";
		},
		A: function () {
			/* Uppercase Ante meridiem and Post meridiem */
			/* AM or PM */
			return this.a().toUpperCase();
		},
		B: function () {
			/* Swatch Internet time */
			/* 000 through 999 */
			var date = this.vars.date, hrs = (date.getUTCHours() + 1) % 24,
				min = date.getUTCMinutes() / 60,
				sec = date.getUTCSeconds() / 3600, swatch = (hrs + min + sec),
				B = Math.floor(swatch * 1000 / 24);

			return this.pad(B, 3);
		},
		g: function () {
			/* 12-hour format of an hour without leading zeros */
			/* 1 through 12 */
			var G = this.G();

			return (G > 12) ? G - 12 : G;
		},
		G: function () {
			/* 24-hour format of an hour without leading zeros */
			/* 0 through 23 */
			return this.vars.date.getHours();
		},
		h: function () {
			/* 12-hour format of an hour with leading zeros */
			/* 01 through 12 */
			var g = this.g();

			return (g < 10) ? ["0", g].join("") : g;
		},
		H: function () {
			/* 24-hour format of an hour with leading zeros */
			/* 00 through 23 */
			var G = this.G();

			return (G < 10) ? ["0", G].join("") : G;
		},
		i: function () {
			/* Minutes with leading zeros */
			/* 00 to 59 */
			var i = this.vars.date.getMinutes();

			return (i < 10) ? ["0", i].join("") : i;
		},
		s: function () {
			/* Seconds, with leading zeros */
			/* 00 through 59 */
			var s = this.vars.date.getSeconds();

			return (s < 10) ? ["0", s].join("") : s;
		},
		u: function () {
			/* Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds. */
			/* Example: 654321 */
			return this.pad(this.vars.date.getMilliseconds() * 1000, 6);
		},
/* -------------------------------- *\
	$TIMEZONE
\* -------------------------------- */
		e: function () {
/* !!! PARTIAL FUNCTIONALITY !!! */
			/* Timezone identifier (added in PHP 5.1.0) */
			/* Examples: UTC, GMT, Atlantic/Azores */
			var O = parseInt(this.O(), 10) + (this.I() * 100);

			return "UTC";
		},
		I: function () {
			/* Whether or not the date is in daylight saving time */
			/* 1 if Daylight Saving Time, 0 otherwise. */
			var jan = new Date(this.Y(), 0, 1), jul = new Date(this.Y(), 6, 1),
				I = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

			return ((this.Z() / 60) < I) ? 1 : 0;
		},
		O: function () {
			/* Difference to Greenwich time (GMT) in hours */
			/* Example: +0200 */
			var offset = (this.vars.date.getTimezoneOffset() / 60) * 100,
				pos = (offset > 0) ? "-" : "+";

			return [pos, this.pad(offset, 4)].join("");
		},
		P: function () {
			/* Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3) */
			/* Example: +02:00 */
			var O = this.O();

			return [O.slice(0, 3), ":", O.slice(3)].join("");
		},
		T: function () {
/* !!! PARTIAL FUNCTIONALITY !!! */
			/* Timezone abbreviation */
			/* Examples: EST, MDT ... */
			return this.e();
		},
		Z: function () {
			/* Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. */
			/* -43200 through 50400 */
			return this.vars.date.getTimezoneOffset() * -60;
		},
/* -------------------------------- *\
	$FULL DATE/TIME
\* -------------------------------- */
		c: function () {
			/* ISO 8601 date (added in PHP 5) */
			/* 2004-02-12T15:19:21+00:00 */
			return [this.date("Y-m-d\\TH:i:sP")].join("");
		},
		r: function () {
			/* » RFC 2822 formatted date */
			/* Example: Thu, 21 Dec 2000 16:01:07 +0200 */
			return this.date("D, j M Y H:i:s O");
		},
		U: function () {
			/* Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT) */
			/* See also time() */
			return Math.floor(this.vars.date.getTime() / 1000);
		},
/* -------------------------------- *\
	$OUTPUT
\* -------------------------------- */
		date: function (format, timestamp) {
			var output = [], $this = this, parts = [], raw = false,
				i = 0, l = 0;

			if (!format) {
				return "";
			}

			if (timestamp) {
				this.vars.date = new Date(timestamp * 1000);
			}

			parts = format.split("");

			for (i = 0, l = parts.length; i < l; i += 1) {
				raw = (parts[i] === "\\") ? true : false;

				if (raw) {
					i += 1;
				}

				if (parts[i].match(/[A-Za-z]/) && !raw) {
					parts[i] = ($this[parts[i]] !== undefined) ? $this[parts[i]]() : parts[i];
				}

				output.push(parts[i]);
			}

			return output.join("");
		}
	};

	window.DateJS = DateJS;
}(document, window));