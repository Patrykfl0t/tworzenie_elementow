function dodaj() {
    const imie = document.getElementById('imie').value.trim();
    const nazwisko = document.getElementById('nazwisko').value.trim();
    const pelnoletni = document.getElementById('pelnoletni').checked;
    const kolor = document.getElementById('kolor').value;

    if (imie === '' || nazwisko === '') return;

    const tekst = `${imie.toUpperCase()} ${nazwisko.toUpperCase()}, jesteś ` + (pelnoletni ? "pełnoletni/a" : "niepełnoletni/a");

    const div = document.createElement('div');
    div.className = 'entry';
    div.style.color = kolor;
    div.style.backgroundColor = 'transparent';

    const span = document.createElement('span');
    span.textContent = tekst;

    const btn = document.createElement('button');
    btn.textContent = 'usuń';
    btn.onclick = function (e) {
        e.stopPropagation();
        div.remove();
    };

    div.appendChild(span);
    div.appendChild(btn);

    div.onclick = function () {
        const nowyKolor = document.getElementById('kolor').value;

        const tester = document.createElement('div');
        tester.style.color = nowyKolor;
        document.body.appendChild(tester);
        const kolorRGB = getComputedStyle(tester).color;
        document.body.removeChild(tester);

        const kolorTekstu = div.style.color.replace(/\s+/g, '').toLowerCase();
        const kolorRGBBezSpacji = kolorRGB.replace(/\s+/g, '').toLowerCase();

        if (kolorTekstu === kolorRGBBezSpacji) {
            div.style.backgroundColor = rozjasnijKolor(nowyKolor);
        } else {
            div.style.backgroundColor = nowyKolor;
        }
    };

    document.getElementById('lista').appendChild(div);
}

function wyczysc() {
    document.getElementById('imie').value = '';
    document.getElementById('nazwisko').value = '';
    document.getElementById('pelnoletni').checked = false;
    document.getElementById('kolor').value = '#cc0000';
}

function rozjasnijKolor(hex, procent = 40) {
    const num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) + Math.round((255 - (num >> 16)) * procent / 100);
    let g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * procent / 100);
    let b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * procent / 100);

    r = r < 255 ? r : 255;
    g = g < 255 ? g : 255;
    b = b < 255 ? b : 255;

    return `rgb(${r},${g},${b})`;
}
