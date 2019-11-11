const {getCDataType} = require('../data')

const renderArg = ($, arg) => {
  const node = $(arg)
  const name = node.attr('name')
  const typeId = node.attr('type')
  const type = getCDataType($, typeId)
  // TODO Type cast arg from C to C++
  // https://github.com/swiftfn/Cpp4Susans/issues/3
  return `${name}`
}

const renderArgs = ($, args) => {
  let acc = []

  args.each((idx, arg) => {
    acc.push('    ' + renderArg($, arg))
  })

  const renderedArgs = acc.join(',\n')

  return acc.length === 0
    ? '()'
    : '(\n' + renderedArgs + '\n  )'
}

module.exports = {
  renderArgs
}
