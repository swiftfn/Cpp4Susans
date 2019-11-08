const {getDataType} = require('../castxml')

const renderArg = ($, arg) => {
  const node = $(arg)
  const name = node.attr('name')
  const typeId = node.attr('type')
  const type = getDataType($, typeId)
  return `${type} ${name}`
}

const renderArgs = ($, args, selfId) => {
  let acc = []

  if (selfId) {
    const self = $(`[id="${selfId}"]`)
    const isClass = self.prop('nodeName') === 'CLASS'  // or 'STRUCT'
    const type = getDataType($, self)
    acc.push(
      '  ' +
      type +
      (isClass ? '* self' : ' self')
    )
  }

  args.each((idx, arg) => {
    acc.push('  ' + renderArg($, arg))
  })

  const renderedArgs = acc.join(',\n')

  return acc.length === 0
    ? '()'
    : '(\n' + renderedArgs + '\n)'
}

module.exports = {
  renderArg,
  renderArgs
}
