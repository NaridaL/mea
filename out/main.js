const MooEl = Element;
function valuesFromHash(hash) {
    const values = {};
    weapons.forEach(w => { assert(!values.hasOwnProperty(w.sn), w.sn), values[w.sn] = w.startlvl; });
    mpchars.forEach(w => { assert(!values.hasOwnProperty(w.sn), w.sn), values[w.sn] = w.startlvl || 0; });
    const regex = /([A-Za-z]+)([0-9]{1,2})/g;
    let match;
    while (match = regex.exec(hash)) {
        const value = parseInt(match[2]);
        const sn = match[1];
        if (1 <= value && value <= 10 && values.hasOwnProperty(sn)) {
            values[sn] = value;
        }
    }
    return values;
}
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const cats = { SR: 'Sniper Rifles', AR: 'Assault Rifles', P: 'Pistols', SG: 'Shotguns' };
const weapons = $('wstats').text.trim().split(/\r?\n/).map(line => {
    const cols = line.split('\t');
    let i = 0;
    return { type: cols[i++], sn: cols[i++], rarity: cols[i++], name: cols[i++], startlvl: parseInt(cols[i++]) || 0 };
})
    .sort((a, b) => a.name.localeCompare(b.name));
const weaponTypes = Object.getOwnPropertyNames(cats).map(sn => ({ type: cats[sn], ws: weapons.filter(w => w.type == sn) }));
function hashFromValues(values) {
    let c;
    return Object.getOwnPropertyNames(values)
        .filter(sn => values[sn] !== ((c = mpchars.find(e => e.sn == sn)) && c.startlvl || 0))
        .map(sn => sn + values[sn])
        .join('');
}
function createWeaponDisplay() {
    const weaponsDiv = $('weapons');
    weaponTypes.forEach(cat => {
        const wcatDiv = template('templateWCat', { wcat: cat.type }).inject(weaponsDiv);
        cat.ws.forEach(w => {
            template('templateWeapon', w)
                .addEvent('mousedown', incWeapon)
                .addEvent('mousedown', e => e.preventDefault()) // stop highlighting
                .inject(wcatDiv);
        });
    });
}
function createCharDisplay() {
    const weaponsDiv = $('chars');
    mpchars.forEach(w => {
        template('templateChar', w)
            .addEvent('mousedown', incChar)
            .addEvent('mousedown', e => e.preventDefault()) // stop highlighting
            .inject(weaponsDiv);
    });
}
function incWeapon(e) {
    const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1];
    assert(sn);
    const newValue = Math.max((values[sn] + 1) % 11, weapons.find(w => w.sn == sn).startlvl);
    values[sn] = newValue;
    save();
    updateWeapon(sn, newValue);
}
function incChar(e) {
    const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1];
    assert(sn);
    const newValue = Math.max((values[sn] + 1) % 6, mpchars.find(c => c.sn == sn).startlvl || 0);
    values[sn] = newValue;
    save();
    updateChar(sn, newValue);
}
function template(templateName, map) {
    let html = $(templateName).text;
    for (const key in map) {
        html = html.replace(new RegExp('\\$' + key, 'g'), map[key]);
    }
    return $(new MooEl('div', { html: html.trim() }).firstChild);
}
function save() {
    document.title = 'MEA MP ' + prog(totalUnlocks(values), maxUnlocks());
    let hash = hashFromValues(values);
    if (modeHash) {
        window.location.hash = '#' + hash;
    }
    else {
        document.cookie = 'unlocks=' + hash + ';expires=' + new Date(2185, 10, 7).toUTCString();
        console.log(hash);
    }
    updateSaveMode();
}
function totalUnlocks(values) {
    return (weapons.map(w => values[w.sn] - w.startlvl).sum()
        + mpchars.map(c => values[c.sn] - (c.startlvl || 0)).sum());
}
function maxUnlocks() {
    return (weapons.length * 10
        + mpchars.map(c => 5 - (c.startlvl || 0)).sum());
}
function updateWeapon(sn, value) {
    let wdiv = $('sn-' + sn);
    wdiv.getElements('.bullet').forEach((el, i) => {
        el.toggleClass('on', i < value);
    });
    wdiv.getElement('.wlvl').set('text', value ? roman[value - 1] : '');
    const wcat = wdiv.getParent().id.match(/wcat-(.*)/)[1];
    const ww = weaponTypes.find(wt => wt.type == wcat).ws;
    wdiv.getParent().getElement('.prog').set('text', prog(ww.map(w => values[w.sn]).sum(), ww.length * 10));
}
function prog(prog, total) {
    return prog + '/' + total + ' ' + Math.round(prog / total * 100) + '%';
}
function updateChar(sn, value) {
    let wdiv = $('sn-' + sn);
    wdiv.getElements('.bullet').forEach((el, i) => {
        el.toggleClass('on', i < value);
    });
    const maxUnlocks = mpchars.map(c => 5 - (c.startlvl || 0)).sum();
    const unlocks = mpchars.map(c => values[c.sn] - (c.startlvl || 0)).sum();
    $('charTotal').set('text', prog(unlocks, maxUnlocks));
}
function updateSaveMode() {
    let hash = hashFromValues(values);
    if (hash) {
        if (modeHash) {
            $('saveinfo').set('html', 'Saving to hash. <a href="javascript:saveToCookie()">save to cookie instead</a>');
        }
        else {
            $('saveinfo').set('html', 'Saving to cookie. <a href="#' + hash + '">share-/bookmarkable version</a>');
        }
    }
    else {
        $('saveinfo').set('html', '');
    }
}
let values = {};
let modeHash = !!window.location.hash;
window.onload = function () {
    createWeaponDisplay();
    createCharDisplay();
    load();
};
function saveToCookie() {
    const match = document.cookie && document.cookie.match(/unlocks=(.*)/), cookieHash = match && match[1];
    let cookieValues = valuesFromHash(cookieHash || '');
    const cookiePercent = Math.round(totalUnlocks(cookieValues) / maxUnlocks() * 100);
    const hashPercent = Math.round(totalUnlocks(valuesFromHash(window.location.hash.substr(1))) / maxUnlocks() * 100);
    if (!cookiePercent || confirm(`Overwrite current cookie (${cookiePercent}% unlocked) with the hash (${hashPercent}% unlocked)?`)) {
        window.location.hash = '';
        values = cookieValues;
        weapons.forEach(w => {
            updateWeapon(w.sn, values[w.sn]);
        });
        mpchars.forEach(w => {
            updateChar(w.sn, values[w.sn]);
        });
        modeHash = false;
        save();
    }
}
function load() {
    if (window.location.hash && window.location.hash.substr(1)) {
        values = valuesFromHash(window.location.hash.substr(1));
        modeHash = true;
    }
    else {
        const match = document.cookie && document.cookie.match(/unlocks=(.*)/), cookieHash = match && match[1];
        values = valuesFromHash(cookieHash || '');
        modeHash = false;
    }
    save();
    weapons.forEach(w => {
        updateWeapon(w.sn, values[w.sn]);
    });
    mpchars.forEach(w => {
        updateChar(w.sn, values[w.sn]);
    });
}
window.addEventListener("hashchange", load, false);
//# sourceMappingURL=main.js.map