/**
 * Created by aval on 11.03.2017.
 */
const MooEl: ElementConstructor = Element



const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']


declare const mpchars: { name: string, sn: string, startlvl: int, rarity: int }[]
mpchars.forEach(char => char.startlvl = char.startlvl || 0)
const inv: { name: string, sn: string, startlvl?: int, rarity?: int }[] = [
	{sn: 'c', name: 'Cobra'},
	{sn: 'm', name: 'Medigel'},
	{sn: 'a', name: 'Ammo Kit'},
	{sn: 's', name: 'Shield Boost'}]
inv.forEach(i => (i.startlvl = 2, i.rarity = 0))
const cats = {AR: 'Assault Rifles', P: 'Pistols', SG: 'Shotguns', SR: 'Sniper Rifles'}
const weapons = $('wstats').text.trim().split(/\r?\n/).map(line => {
	const cols = line.split('\t');
	let i = 0;
	return {type: cols[i++], sn: cols[i++], rarity: cols[i++], name: cols[i++], startlvl: parseInt(cols[i++]) || 0}})
	.sort((a, b) => a.rarity - b.rarity || a.name.localeCompare(b.name))
const mods = $('mstats').text.trim().split(/\r?\n/).map(line => {
	const cols = line.split('\t');
	let i = 0;
	return {rarity: cols[i++], sn: cols[i++], category: cols[i++], name: cols[i++], startlvl: 0}})
	.sort((a, b) => a.category.localeCompare(b.category) || a.rarity - b.rarity || a.name.localeCompare(b.name))
const all = weapons.concat(mods, mpchars, inv)
const weaponTypes:{ type: string, ws: { name: string, sn: string }[] }[] =
	Object.getOwnPropertyNames(cats).map(sn => ({type: cats[sn], ws: weapons.filter(w => w.type == sn)}))



function valuesFromHash(hash: string): { [sn: string]: int } {
	const values = {}
	weapons.forEach(e => {assert(!values.hasOwnProperty(e.sn), e.sn), values[e.sn] = e.startlvl})
	mpchars.forEach(e => {assert(!values.hasOwnProperty(e.sn), e.sn), values[e.sn] = e.startlvl})
	mods   .forEach(e => {assert(!values.hasOwnProperty(e.sn), e.sn), values[e.sn] = e.startlvl})
	inv    .forEach(e => {assert(!values.hasOwnProperty(e.sn), e.sn), values[e.sn] = e.startlvl})

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
		.filter(sn => values[sn] !== all.find(e => e.sn == sn).startlvl)
		.map(sn => sn + values[sn])
		.join('')
}
function createWeaponDisplay() {
	const container = $('weapons')
	weaponTypes.forEach(cat => {
		const wcatDiv = template('templateWCat', {wcat: cat.type}).inject(container)
		cat.ws.forEach(w => {
			template('templateWeapon', w)
				.addEvent('mousedown', incWeapon)
				.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
				.inject(wcatDiv)
		})
	})
}
function createCharDisplay() {
	const container = $('chars')
	mpchars.forEach(w => {
		template('templateChar', w)
			.addEvent('mousedown', incChar)
			.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
			.inject(container)
	})
}
function createModDisplay() {
	const container = $('mods')
	mods.forEach(w => {
		template('templateMod', w)
			.addEvent('mousedown', incMod)
			.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
			.inject(container)
	})
}
function createInvDisplay() {
	const container = $('inv')
	inv.forEach(w => {
		template('templateInv', w)
			.addEvent('mousedown', incInv)
			.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
			.inject(container)
	})
}
function incWeapon(e: DOMEvent) {
	const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1]
	assert(sn)
	const newValue = Math.max((values[sn] + 1) % 11, weapons.find(w => w.sn == sn).startlvl)
	values[sn] = newValue
	save()
	updateWeapon(sn, newValue)
}
function incInv(e: DOMEvent) {
	const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1]
	assert(sn)
	const newValue = Math.max((values[sn] + 1) % 6, inv.find(w => w.sn == sn).startlvl)
	values[sn] = newValue
	save()
	updateInv(sn, newValue)
}
function incChar(e: DOMEvent) {
	const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1]
	assert(sn)
	const newValue = Math.max((values[sn] + 1) % 11, mpchars.find(c => c.sn == sn).startlvl || 0)
	values[sn] = newValue
	save()
	updateChar(sn, newValue)
}
function incMod(e: DOMEvent) {
	const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1]
	assert(sn)
	const newValue = Math.max((values[sn] + 1) % 11, mods.find(c => c.sn == sn).startlvl)
	values[sn] = newValue
	save()
	updateMod(sn, newValue)
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
	return all.map(w => values[w.sn] - w.startlvl).sum()
}
function maxUnlocks() {
	return all.map(e => (inv.includes(e) ? 5 : 10) - e.startlvl).sum()
}
function prog(prog, total) {
	return prog + '/' + total + ' ' + Math.round(prog / total * 100) + '%'
}
function updateWeapon(sn: string, value: int) {
	const div = $('sn-' + sn)
	div.getElements('.bullet').forEach((el, i) => {
		el.toggleClass('on', i < value)
	})
	div.getElement('.wlvl').set('text', value ? roman[value - 1] : '')

	const wcat = div.getParent().id.match(/wcat-(.*)/)[1]
	const ww = weaponTypes.find(wt => wt.type == wcat).ws
	div.getParent().getElement('.prog').set('text', prog(
		ww.map(w => values[w.sn]).sum(),
		ww.length * 10))
}
function updateChar(sn: string, value: int) {
	const div = $('sn-' + sn)
	div.getElements('.bullet').forEach((el, i) => {
		el.toggleClass('on', i < value)
	})

	const maxUnlocks = mpchars.map(c => 5 - c.startlvl).sum()
	const unlocks = mpchars.map(c => values[c.sn] - c.startlvl).sum()
	$('charTotal').set('text', prog(unlocks, maxUnlocks))
}
function updateMod(sn: string, value: int) {
	const div = $('sn-' + sn)
	div.getElements('.bullet').forEach((el, i) => {
		el.toggleClass('on', i < value)
	})

	const maxUnlocks = 5 * mods.length
	const unlocks = mods.map(c => values[c.sn] - c.startlvl).sum()
	$('modTotal').set('text', prog(unlocks, maxUnlocks))
}
function updateInv(sn: string, value: int) {
	const div = $('sn-' + sn)
	div.getElements('.bullet').forEach((el, i) => {
		el.toggleClass('on', i < value)
	})

	const maxUnlocks = inv.map(c => 5 - c.startlvl).sum()
	const unlocks = inv.map(c => values[c.sn] - c.startlvl).sum()
	$('invTotal').set('text', prog(unlocks, maxUnlocks))
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
	createCharDisplay()
	createModDisplay()
	createInvDisplay()

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
		weapons.forEach(w => {
			updateWeapon(w.sn, values[w.sn])
		})
		mpchars.forEach(w => {
			updateChar(w.sn, values[w.sn])
		})
		mods.forEach(w => {
			updateMod(w.sn, values[w.sn])
		})
		mods.forEach(w => {
			updateInv(w.sn, values[w.sn])
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

	weapons.forEach(w => {
		updateWeapon(w.sn, values[w.sn])
	})
	mpchars.forEach(w => {
		updateChar(w.sn, values[w.sn])
	})
	mods.forEach(w => {
		updateMod(w.sn, values[w.sn])
	})
	inv.forEach(w => {
		updateInv(w.sn, values[w.sn])
	})
}
window.addEventListener("hashchange", load, false);