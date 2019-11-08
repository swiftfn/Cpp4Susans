const {getDataType} = require('../util')

const renderArg = ($, arg) => {
  const node = $(arg)
  const name = node.attr('name')
  const typeId = node.attr('type')
  const type = getDataType($, typeId)
  return `${type} ${name}`
}

const renderArgs = ($, args) => {
  let acc = []
  args.each((idx, arg) => {
    acc.push('  ' + renderArg($, arg))
  })
  return acc.join(',\n')
}

module.exports = {
  renderArg,
  renderArgs
}
