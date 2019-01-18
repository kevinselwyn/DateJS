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

class DateJS {
    constructor() {
        this._date = new Date();
    }

    static get str() {
        return {
            month: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            week: [
                'Sun',
                'Mon',
                'Tues',
                'Wednes',
                'Thurs',
                'Fri',
                'Satur'
            ]
        }
    }

    // day
    d() {
        /* Day of the month, 2 digits with leading zeros */
        /* 01 to 31 */
        const j = this.j();

        return j.toString().padStart(2, '0');
    }

    D() {
        /* A textual representation of a day, three letters */
        /* Mon through Sun */
        return this.l().substring(0, 3);
    }

    j() {
        /* Day of the month without leading zeros */
        /* 1 to 31 */
        return this._date.getDate();
    }

    l() {
        /* A full textual representation of the day of the week */
        /* Sunday through Saturday */
        return DateJS.str.week[this.w()] + 'day';
    }

    N() {
        /* ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0) */
        /* 1 (for Monday) through 7 (for Sunday) */
        const w = this.w();

        return (w === 0) ? 7 : w;
    }

    S() {
        /* English ordinal suffix for the day of the month, 2 characters */
        /* st, nd, rd or th. Works well with j */
        const j = this.j();
        let S = 0;

        if (j < 11 || j > 12) {
            S = ((j % 10) > 3) ? 0 : (j % 10);
        }

        return ['th', 'st', 'nd', 'rd'][S];
    }

    w() {
        /* Numeric representation of the day of the week */
        /* 0 (for Sunday) through 6 (for Saturday) */
        return this._date.getDay();
    }

    z() {
        /* The day of the year (starting from 0) */
        /* 0 through 365 */
        const start = new Date(this.Y(), 0, 1);

        return Math.ceil(((this._date - start) / 86400000) - 1);
    }

    // week
    W() {
        /* ISO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0) */
        /* Example: 42 (the 42nd week in the year) */
        return Math.ceil(this.z() / 7);
    }

    // month
    F() {
        /* A full textual representation of a month, such as January or March */
        /* January through December */
        return DateJS.str.month[this.n() - 1];
    }

    m() {
        /* Numeric representation of a month, with leading zeros */
        /* 01 through 12 */
        const n = this.n();

        return n.toString().padStart(2, '0');
    }

    M() {
        /* A short textual representation of a month, three letters */
        /* Jan through Dec */
        return this.F().substring(0, 3);
    }

    n() {
        /* Numeric representation of a month, without leading zeros */
        /* 1 through 12 */
        return this._date.getMonth() + 1;
    }

    t() {
        /* Number of days in the given month */
        /* 28 through 31 */
        return new Date(this.Y(), this.n(), 0).getDate();
    }

    // year
    L() {
        /* Whether it's a leap year */
        /* 1 if it is a leap year, 0 otherwise. */
        return (new Date(this.Y(), 1, 29).getMonth() === 1) ? 1 : 0;
    }

    o() {
        /* SO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0) */
        /* Examples: 1999 or 2003 */
        return this.Y();
    }

    Y() {
        /* A full numeric representation of a year, 4 digits */
        /* Examples: 1999 or 2003 */
        return this._date.getFullYear();
    }

    y() {
        /* A two digit representation of a year */
        /* Examples: 99 or 03 */
        return this.Y().toString().substring(2, 2);
    }

    // time
    a() {
        /* Lowercase Ante meridiem and Post meridiem */
        /* am or pm */
        return (this.G() > 12) ? 'pm' : 'am';
    }

    A() {
        /* Uppercase Ante meridiem and Post meridiem */
        /* AM or PM */
        return this.a().toUpperCase();
    }

    B() {
        /* Swatch Internet time */
        /* 000 through 999 */
        const hrs = (this._date.getUTCHours() + 1) % 24;
        const min = this._date.getUTCMinutes() / 60;
        const sec = this._date.getUTCSeconds() / 3600;

        return Math.floor((hrs + min + sec) * 1000 / 24).toString().padStart(3, '0');
    }

    g() {
        /* 12-hour format of an hour without leading zeros */
        /* 1 through 12 */
        const G = this.G();

        return G % 12;
    }

    G() {
        /* 24-hour format of an hour without leading zeros */
        /* 0 through 23 */
        return this._date.getHours();
    }

    h() {
        /* 12-hour format of an hour with leading zeros */
        /* 01 through 12 */
        const g = this.g();

        return g.toString().padStart(2, '0');
    }

    H() {
        /* 24-hour format of an hour with leading zeros */
        /* 00 through 23 */
        const G = this.G();

        return G.toString().padStart(2, '0');
    }

    i() {
        /* Minutes with leading zeros */
        /* 00 to 59 */
        const i = this._date.getMinutes();

        return i.toString().padStart(2, '0');
    }

    s() {
        /* Seconds, with leading zeros */
        /* 00 through 59 */
        const s = this._date.getSeconds();

        return s.toString().padStart(2, '0');
    }

    u() {
        /* Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds. */
        /* Example: 654321 */
        return (this._date.getMilliseconds() * 1000).toString().padStart(6, '0');
    }

    // timezone
    e() {
    /* !!! PARTIAL FUNCTIONALITY !!! */
        /* Timezone identifier (added in PHP 5.1.0) */
        /* Examples: UTC, GMT, Atlantic/Azores */
        const O = parseInt(this.O(), 10) + (this.I() * 100);

        return 'UTC';
    }

    I() {
        /* Whether or not the date is in daylight saving time */
        /* 1 if Daylight Saving Time, 0 otherwise. */
        const jan = new Date(this.Y(), 0, 1);
        const jul = new Date(this.Y(), 6, 1);
        const I = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

        return ((this.Z() / 60) < I) ? 1 : 0;
    }

    O() {
        /* Difference to Greenwich time (GMT) in hours */
        /* Example: +0200 */
        const offset = (this._date.getTimezoneOffset() / 60) * 100;
        const pos = (offset > 0) ? '-' : '+';

        return pos + offset.toString().padStart(4, '0');
    }

    P() {
        /* Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3) */
        /* Example: +02:00 */
        const O = this.O();

        return O.slice(0, 3) + ':' + O.slice(3);
    }

    T() {
    /* !!! PARTIAL FUNCTIONALITY !!! */
        /* Timezone abbreviation */
        /* Examples: EST, MDT ... */
        return this.e();
    }

    Z() {
        /* Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. */
        /* -43200 through 50400 */
        return this._date.getTimezoneOffset() * -60;
    }

    // full date/time
    c() {
        /* ISO 8601 date (added in PHP 5) */
        /* 2004-02-12T15:19:21+00:00 */
        return this.date('Y-m-d\\TH:i:sP');
    }

    r() {
        /* » RFC 2822 formatted date */
        /* Example: Thu, 21 Dec 2000 16:01:07 +0200 */
        return this.date('D, d M Y H:i:s O');
    }

    U() {
        /* Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT) */
        /* See also time() */
        return Math.floor(this._date.getTime() / 1000);
    }

    // output
    date(format, timestamp) {
        const output = [];
        let i = 0;
        let l = 0;

        if (!format) {
            return '';
        }

        if (timestamp) {
            this._date = new Date(timestamp * 1000);
        }

        const parts = format.split('');

        for (i = 0, l = parts.length; i < l; i += 1) {
            const raw = (parts[i] === '\\') ? true : false;

            if (raw) {
                i += 1;
            }

            if (!raw && parts[i].match(/[A-Za-z]/)) {
                parts[i] = (this[parts[i]] !== undefined) ? this[parts[i]]() : parts[i];
            }

            output.push(parts[i]);
        }

        return output.join('');
    }
}

module.exports = DateJS;
