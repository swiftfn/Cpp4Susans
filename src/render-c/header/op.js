const map = {
  '=': 'eq',
  '!': 'not',
  '[': 'lbra',
  ']': 'rbra',
  '(': 'lparen',
  ')': 'rparen',
  '+': 'plus',
  '-': 'minus',
  '*': 'mult'
}

const convertOperatorChar = (char) => {
  const ret = map[char]
  if (!ret) {
    throw new Error(`Could not convert operator char: ${char}`)
  }
  return ret
}

// Converts opName to valid C function name.
const convertOperatorName = (opName) =>
  Array.from(opName).map(c => convertOperatorChar(c)).join('_')

module.exports = {
  convertOperatorName
}
