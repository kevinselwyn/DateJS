const format = document.querySelector('#format input');
const output = document.querySelector('#output p');
const d = new DateJS();
const update = () => {
    output.innerHTML = d.date(format.value);
};
let vars = {};

window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (_, key, value) => {
    vars[key] = decodeURIComponent(value).replace(/\+/g, ' ');
});

if (vars.f) {
    format.value = vars.f;
}

update();

format.addEventListener('keyup', () => {
    update();
});
