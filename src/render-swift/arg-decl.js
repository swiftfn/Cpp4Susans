const {formatRenderArgs} = require('../render-util/arg')
const {getSwiftDataType} = require('./data')

const renderDeclArg = ($, arg, idx) => {
  const node = $(arg)
  const name = node.attr('name') || `arg${idx}`
  const typeId = node.attr('type')
  const type = getSwiftDataType($, typeId)
  return `${name}: ${type}`
}

const renderDeclArgs = ($, args) =>
  formatRenderArgs($, args, renderDeclArg)

module.exports = {
  renderDeclArg,
  renderDeclArgs
}
