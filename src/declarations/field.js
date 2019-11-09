const collectField = ($, node) => {
  return {
    type: 'FIELD',
    node
  }
}

const register = (registry) => {
  registry['FIELD'] = collectField
}

module.exports = {
  register
}
