const {renderEnumForwardDeclaration} = require('../header/enum')

const register = (registry) => {
  registry['ENUMERATION'] = ($, declaration) =>
    `${renderEnumForwardDeclaration($, declaration)};`
}

module.exports = {
  register
}
