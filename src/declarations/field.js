const collectField = ($, node) => {
  return {
    type: 'field',
    node
  }
}

const register = (registry) => {
  registry['FIELD'] = collectField
}

module.exports = {
  register
}
