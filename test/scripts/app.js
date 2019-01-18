class DateJSCheck {
    constructor() {
        this._a = [];
        this._b = [];
        this._check = [];

        this.setup();
        this.check();
    }

    setup() {
        const tds = [].slice.call(document.querySelectorAll('td'));

        tds
            .forEach((td) => {
                switch (td.className) {
                    case 'a':
                        this._a.push(td);

                        break;
                    case 'b':
                        this._b.push(td);

                        break;
                    case 'check':
                        this._check.push(td);

                        break;
                    default:
                        break;
                    }
            });
    }

    check() {
        this._a
            .forEach((_, i) => {
                if (this._b[i].childNodes.length <= 1) {
                    return;
                }

                const a_val = this._a[i].childNodes[0].nodeValue;
                const b_val = this._b[i].childNodes[1].nodeValue;

                if (a_val !== b_val) {
                    this._a[i].style.background = 'red';
                    this._b[i].style.background = 'red';
                    this._check[i].className = ['check', 'error'].join(' ');
                } else {
                    this._check[i].className = ['check', 'success'].join(' ');
                }
            });
    }
}

window.addEventListener('load', function () {
    const _check = new DateJSCheck();
});
