fs = require('fs')
console.log("bluh")
const data = fs.readFileSync('inventory_definitions-2017-03-24-09h30.json', 'utf8')
const inv = eval('(' + data + ')')
inv.list.filter(l => l.customAttributes.itemPartType).forEach(l => {
  const ca = l.customAttributes
  console.log([ l.rarity, l.locName].join('\t'))
})
