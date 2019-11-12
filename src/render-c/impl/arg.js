const {formatRenderArgs} = require('../../render-util/arg')
const {getCDataType} = require('../data')

const renderArg = ($, arg, idx) => {
  const node = $(arg)
  const name = node.attr('name') || `arg${idx}`
  const typeId = node.attr('type')
  const type = getCDataType($, typeId)
  // TODO Type cast arg from C to C++
  // https://github.com/swiftfn/Cpp4Susans/issues/3
  return `${name}`
}

const renderArgs = ($, args) =>
  formatRenderArgs($, args, renderArg, '  ')

module.exports = {
  renderArgs
}
