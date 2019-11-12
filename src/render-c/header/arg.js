const {collectRenderArgs, formatRenderedArgs} = require('../../render-util/arg')
const {getCDataType} = require('../data')

const renderSelfArg = ($, selfId) => {
  const self = $(`[id="${selfId}"]`)
  const isClass = self.prop('nodeName') === 'CLASS'  // or 'STRUCT'
  const type = getCDataType($, self)
  return type + (isClass ? '* self' : ' self')
}

const renderArg = ($, arg, idx) => {
  const node = $(arg)
  const name = node.attr('name') || `arg${idx}`
  const typeId = node.attr('type')
  const type = getCDataType($, typeId)
  return `${type} ${name}`
}

const renderArgs = ($, args, selfId) => {
  const acc = collectRenderArgs($, args, renderArg)

  if (selfId) {
    acc.unshift(renderSelfArg($, selfId))
  }

  return formatRenderedArgs(acc)
}

module.exports = {
  renderArg,
  renderArgs
}
