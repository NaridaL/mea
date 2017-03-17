/**
 * Created by aval on 11.03.2017.
 */
declare const weaponTypes: { type: string, ws: { name: string, sn: string }[] }[]
declare const mpchars: { names: string, sn: string, startlvl: int }[]
const MooEl: ElementConstructor = Element
function valuesFromHash(hash: string): { [sn: string]: int } {
	const values = {}
	getAllWeapons().forEach(w => {assert(!values.hasOwnProperty(w.sn), w.sn), values[w.sn] = 0})
	mpchars.forEach(w => {assert(!values.hasOwnProperty(w.sn), w.sn), values[w.sn] = w.startlvl || 0})

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
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
function hashFromValues(values: { [sn: string]:int }): string {
	let c
	return Object.getOwnPropertyNames(values)
		.filter(sn => values[sn] !== ((c = mpchars.find(e => e.sn == sn)) && c.startlvl || 0))
		.map(sn => sn + values[sn])
		.join('')
}
function getAllWeapons() {
	return weaponTypes.map(cat => cat.ws).concatenated()
}
function createWeaponDisplay() {
	const weaponsDiv = $('weapons')
	weaponTypes.forEach(cat => {
		const wcatDiv = template('templateWCat', {wcat: cat.type}).inject(weaponsDiv)
		cat.ws.forEach(w => {
			template('templateWeapon', w)
				.addEvent('mousedown', incWeapon)
				.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
				.inject(wcatDiv)
		})
	})
}
function createCharDisplay() {
	const weaponsDiv = $('chars')
	mpchars.forEach(w => {
		template('templateChar', w)
			.addEvent('mousedown', incChar)
			.addEvent('mousedown', e => e.preventDefault()) // stop highlighting
			.inject(weaponsDiv)
	})
}
function incWeapon(e: DOMEvent) {
	const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1]
	assert(sn)
	const newValue = (values[sn] + 1) % 11
	values[sn] = newValue
	save()
	updateWeapon(sn, newValue)
}
function incChar(e: DOMEvent) {
	const sn = e.event.currentTarget.id.match(/sn-(.*)/)[1]
	assert(sn)
	const newValue = Math.max((values[sn] + 1) % 6, mpchars.find(c => c.sn == sn).startlvl || 0)
	values[sn] = newValue
	save()
	updateChar(sn, newValue)
}
function template(templateName, map): HTMLElement {
	let html = $<HTMLScriptElement>(templateName).text
	for (const key in map) {
		html = html.replace(new RegExp('\\$' + key, 'g'), map[key])
	}
	return $(new MooEl('div', {html: html.trim()}).firstChild)

}
function save() {
	document.title = 'MEA MP ' + prog(totalUnlocks(values), maxUnlocks())
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
	return (getAllWeapons().map(({sn}) => values[sn]).sum()
		+ mpchars.map(c => values[c.sn] - (c.startlvl || 0)).sum())
}
function maxUnlocks() {
	return (getAllWeapons().length * 10
	 + mpchars.map(c => 5 - (c.startlvl || 0)).sum())
}
function updateWeapon(sn: string, value: int) {
	let wdiv = $('sn-' + sn)
	wdiv.getElements('.bullet').forEach((el, i) => {
		el.toggleClass('on', i < value)
	})
	wdiv.getElement('.wlvl').set('text', value ? roman[value - 1] : '')

	const wcat = wdiv.getParent().id.match(/wcat-(.*)/)[1]
	const ww = weaponTypes.find(wt => wt.type == wcat).ws
	wdiv.getParent().getElement('.prog').set('text', prog(
		ww.map(w => values[w.sn]).sum(),
		ww.length * 10))
}
function prog(prog, total) {
	return prog + '/' + total + ' ' + Math.round(prog / total * 100) + '%'
}
function updateChar(sn: string, value: int) {
	let wdiv = $('sn-' + sn)
	wdiv.getElements('.bullet').forEach((el, i) => {
		el.toggleClass('on', i < value)
	})

	const maxUnlocks = mpchars.map(c => 5 - (c.startlvl || 0)).sum()
	const unlocks = mpchars.map(c => values[c.sn] - (c.startlvl || 0)).sum()
	$('charTotal').set('text', prog(unlocks, maxUnlocks))
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

	load()
}
function saveToCookie() {
	const match = document.cookie && document.cookie.match(/unlocks=(.*)/), cookieHash = match && match[1]
	let cookieValues = valuesFromHash(cookieHash || '')
	const cookiePercent = Math.round(totalUnlocks(cookieValues) / maxUnlocks() * 100)
	const hashPercent = Math.round(totalUnlocks(valuesFromHash(window.location.hash.substr(1))) / maxUnlocks() * 100)
	if (!cookiePercent || confirm(
		`Overwrite current cookie (${cookiePercent}% unlocked) with the hash (${hashPercent}% unlocked)?`)) {
		window.location.hash = ''
		values = cookieValues
		getAllWeapons().forEach(w => {
			updateWeapon(w.sn, values[w.sn])
		})
		mpchars.forEach(w => {
			updateChar(w.sn, values[w.sn])
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

	getAllWeapons().forEach(w => {
		updateWeapon(w.sn, values[w.sn])
	})
	mpchars.forEach(w => {
		updateChar(w.sn, values[w.sn])
	})
}
window.addEventListener("hashchange", load, false);