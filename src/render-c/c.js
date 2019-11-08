const {renderCHeader} = require('./header/header')
const {renderCImpl} = require('./impl/impl')

const renderC = ($, declarations) => {
  console.log(renderCHeader($, declarations))
  // console.log(renderCImpl($, declarations))
}

module.exports = {
  renderC
}
