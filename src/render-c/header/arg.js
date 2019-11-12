const {renderArgs: renderArgsUtil} = require('../../render-util/arg')
const {getCDataType} = require('../data')

const renderSelfArg = ($, selfId) => {
  const self = $(`[id="${selfId}"]`)
  const isClass = self.prop('nodeName') === 'CLASS'  // or 'STRUCT'
  const type = getCDataType($, self)
  return type + (isClass ? '* self' : ' self')
}

const renderArg = ($, arg) => {
  const node = $(arg)
  const name = node.attr('name')
  const typeId = node.attr('type')
  const type = getCDataType($, typeId)
  return `${type} ${name}`
}

const renderArgs = ($, args, selfId) => {
  const a = selfId
    ? {
      each: (callback) => {
        callback(0, selfId)
        args.each((idx, arg) => callback(idx + 1, arg))
      }
    }
    : args

  return renderArgsUtil($, a, ($, arg) =>
    typeof arg === 'string'
      ? renderSelfArg($, arg)
      : renderArg($, $(arg))
  )
}

module.exports = {
  renderArg,
  renderArgs
}
