const map = {
  '=': 'eq',
  '!': 'not'
}

// Convert to valid C function name
const convertOperatorName = (opName) =>
  Array.from(opName).map(c => map[c]).join('_')

module.exports = {
  convertOperatorName
}
