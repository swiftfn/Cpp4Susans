const {getSwiftDataType} = require('./data')

const renderDeclArg = ($, arg) => {
  const node = $(arg)
  const name = node.attr('name')
  const typeId = node.attr('type')
  const type = getSwiftDataType($, typeId)
  return `${name}: ${type}`
}

const renderDeclArgs = ($, args) => {
  let acc = []

  args.each((idx, arg) => {
    acc.push('  ' + renderDeclArg($, arg))
  })

  const renderedArgs = acc.join(',\n')

  return acc.length === 0
    ? '()'
    : '(\n' + renderedArgs + '\n)'
}

module.exports = {
  renderDeclArg,
  renderDeclArgs
}
