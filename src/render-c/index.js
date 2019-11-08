const {renderCHeader} = require('./header')
const {renderCImpl} = require('./impl')

const renderC = ($, declarations) => {
  console.log(renderCHeader($, declarations))
  // console.log(renderCImpl($, declarations))
}

module.exports = {
  renderC
}
