const {formatRenderArgs} = require('../render-util/arg')
const {getSwiftDataType} = require('./data')

const renderImplArg = ($, arg, idx) => {
  const node = $(arg)
  const name = node.attr('name') || `arg${idx}`
  const typeId = node.attr('type')
  const type = getSwiftDataType($, typeId)
  // TODO Convert Swift to C
  return name
}

const renderDeclArgs = ($, args) =>
  formatRenderArgs($, args, renderImplArg)

module.exports = {
  renderImplArg,
  renderImplArgs
}
