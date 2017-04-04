/**
 * Created by aval on 11.03.2017.
 */
const MooEl: ElementConstructor = Element



const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

type X =  { name: string, sn: string, min: int, max: int, rarity: int }

declare const mpchars: X[]
mpchars.forEach(char => (char.min = char.min || 0, char.max = 10))

const equ: X[] = [
    {'sn': 'awa', rarity: 1, 'name': 'Adaptive War Amp'},
    {'sn': 'cbu', rarity: 2, 'name': 'Combative Upgrade'},
    {'sn': 'egk', rarity: 1, 'name': 'Engineering Kit'},
    {'sn': 'grl', rarity: 2, 'name': 'Guerrilla Upgrade'},
    {'sn': 'jgg', rarity: 2, 'name': 'Juggernaut Shield'},
    {'sn': 'tcs', rarity: 1, 'name': 'Thermal Clip Storage'}] as any
equ.forEach(i => (i.min = 0, i.max = 1))

const inv: X[] = [
    {sn: 'c', name: 'Cobra'},
    {sn: 'm', name: 'Medigel'},
    {sn: 'a', name: 'Ammo Kit'},
    {sn: 's', name: 'Shield Boost'}] as any
inv.forEach(i => (i.min = 2, i.rarity = 0, i.max = 5))

const cats = {AR: 'Assault Rifles', P: 'Pistols', SG: 'Shotguns', SR: 'Sniper Rifles'}

const weapons: X[] = $('wstats').text.trim().split(/\r?\n/).map(line => {
    const cols = line.split('\t');
    let i = 0;
    return {type: cols[i++], sn: cols[i++], rarity: cols[i++], name: cols[i++], min: parseInt(cols[i++]) || 0, max: 10}
})
    .sort((a, b) => a.rarity - b.rarity || a.name.localeCompare(b.name))

const mods: X[] = $('mstats').text.trim().split(/\r?\n/).map(line => {
    const cols = line.split('\t');
    let i = 0;
    return {rarity: cols[i++], sn: cols[i++], category: cols[i++], name: cols[i++], min: 0, max: 10}
})
    .sort((a, b) => a.category.localeCompare(b.category) || a.rarity - b.rarity || a.name.localeCompare(b.name))

const all: X[] = weapons.concat(mods, mpchars, inv, equ)
const weaponTypes: { type: string, ws: X[] }[] =
    Object.getOwnPropertyNames(cats).map(sn => ({type: cats[sn], ws: weapons.filter(w => w.type == sn)}))



function valuesFromHash(hash: string): { [sn: string]: int } {
	const values = {}
	all.forEach(e => {assert(!values.hasOwnProperty(e.sn), e.sn), values[e.sn] = e.min})

	const regex = /([A-Za-z]+)([0-9]{1,2})/g
	let match
	while (match = regex.exec(hash)) {
		const value = parseInt(match[2])
		const sn = match[1]
		if (1 <= value && value <= 10 && values.hasOwnProperty(sn)) {
			values[sn] = value
		}
	}
	return values
}
function hashFromValues(values: { [sn: string]:int }): string {
	let c
	return Object.getOwnPropertyNames(values)
		.filter(sn => values[sn] !== all.find(e => e.sn == sn).min)
		.map(sn => sn + values[sn])
		.join('')
}
function createWeaponDisplay() {
	const container = $('weapons')
	weaponTypes.forEach(cat => {
		const wcatDiv = template('templateWCat', {wcat: cat.type}).inject(container)
		cat.ws.forEach(w => {
			template('templateWeapon', w)
				.addEvent('mousedown', e => inc(e, cat.ws))
				.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
				.inject(wcatDiv)
		})
	})
}
function createDisplay(divID: string, templateID: string, cat: X[]) {
	const container = $(divID)
	cat.forEach(w => {
		template(templateID, w)
			.addEvent('mousedown', e => inc(e, cat))
			.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
			.inject(container)
	})
}
function inc(e: DOMEvent, cat: X[]) {
    const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1]
    assert(sn)
    const newValue = Math.max(
        (values[sn] + 1) % (all.find(c => c.sn == sn).max + 1),
        all.find(c => c.sn == sn).min)
    values[sn] = newValue
    save()
    update(sn, newValue, cat)
}
function template(templateName, map): HTMLElement {
	let html = $<HTMLScriptElement>(templateName).text
	for (const key in map) {
		html = html.replace(new RegExp('\\$' + key, 'g'), map[key])
	}
	return $(new MooEl('div', {html: html.trim()}).firstChild)

}
function equalObjects(a, b) {
	const aKeys = Object.getOwnPropertyNames(a), bKeys = Object.getOwnPropertyNames(b)
	return aKeys.length === bKeys.length && aKeys.every(ak => a[ak] === b[ak])
}
function save() {
	document.title = 'MEA MP ' + prog(totalUnlocks(values), maxUnlocks())
	$('totaltotal').set('text', prog(totalUnlocks(values), maxUnlocks()))
	let hash = hashFromValues(values)
	if (modeHash) {
		window.location.hash = '#' + hash
	} else {
		document.cookie = 'unlocks=' + hash + ';expires=' + new Date(2185, 10, 7).toUTCString()
		console.log(hash)
	}
	updateSaveMode()
}
function totalUnlocks(values) {
	return all.map(e => values[e.sn]).sum()
}
function maxUnlocks() {
	return all.map(e => e.max).sum()
}
function prog(prog, total) {
	return prog + '/' + total + ' ' + Math.round(prog / total * 100) + '%'
}
function update(sn: string, value: int, cat: X[]) {
    const div = $('sn-' + sn)
    div.getElements('.bullet').forEach((el, i) => {
        el.toggleClass('on', i < value)
    })
	div.getElements('.wlvl').set('text', value ? roman[value - 1] : '')

    const maxUnlocks = cat.map(c => c.max).sum()
    const unlocks = cat.map(c => values[c.sn]).sum()
    div.getParent().getElement('.total').set('text', prog(unlocks, maxUnlocks))
}
function updateSaveMode() {
	let hash = hashFromValues(values)
	if (hash) {
		if (modeHash) {
			$('saveinfo').set('html', 'Saving to hash. <a href="javascript:saveToCookie()">save to cookie instead</a>')
		} else {
			$('saveinfo').set('html', 'Saving to cookie. <a href="#' + hash + '">share-/bookmarkable version</a>')
		}
	} else {
		$('saveinfo').set('html', '')
	}
}
let values: { [sn: string]:int } = {}
let modeHash = !!window.location.hash
window.onload = function () {
	createWeaponDisplay()
    createDisplay('chars', 'templateChar', mpchars)
    createDisplay('mods', 'templateMod', mods)
    createDisplay('inv', 'templateInv', inv)
    createDisplay('equ', 'templateEqu', equ)

	load()
}
function saveToCookie() {
	const match = document.cookie && document.cookie.match(/unlocks=(.*)/), cookieHash = match && match[1]
	const cookieValues = valuesFromHash(cookieHash || '')
	const hashValues = valuesFromHash(window.location.hash.substr(1))
	const cookiePercent = Math.round(totalUnlocks(cookieValues) / maxUnlocks() * 100)
	const hashPercent = Math.round(totalUnlocks(hashValues) / maxUnlocks() * 100)
	if (!cookiePercent || equalObjects(cookieValues, hashValues)|| confirm(
		`Overwrite current cookie (${cookiePercent}% unlocked) with the hash (${hashPercent}% unlocked)?`)) {
		window.location.hash = ''
		values = cookieValues

        weaponTypes.map(wt => wt.ws).concat([mpchars, mods, inv, equ]).forEach(cat => {
            cat.forEach(c => {
                update(c.sn, values[c.sn], cat)
            })
        })
		modeHash = false
		save()
	}
}
function load() {
	if (window.location.hash && window.location.hash.substr(1)) {
		values = valuesFromHash(window.location.hash.substr(1))
		modeHash = true
	} else {
		const match = document.cookie && document.cookie.match(/unlocks=(.*)/), cookieHash = match && match[1]
		values = valuesFromHash(cookieHash || '')
		modeHash = false
	}
	save()

	weaponTypes.map(wt => wt.ws).concat([mpchars, mods, inv, equ]).forEach(cat => {
		cat.forEach(c => {
			update(c.sn, values[c.sn], cat)
		})
	})
}
window.addEventListener("hashchange", load, false);