const {formatRenderArgs} = require('../../render-util/arg')

const {getCDataType} = require('../data')
const {toCpp} = require('../priv')

const renderArg = ($, arg, idx) => {
  const node = $(arg)
  const name = node.attr('name') || `arg${idx}`
  const typeId = node.attr('type')
  const {catetory} = getCDataType($, typeId)
  return toCpp(catetory, name)
}

const renderArgs = ($, args) =>
  formatRenderArgs($, args, renderArg, '  ')

module.exports = {
  renderArgs
}
