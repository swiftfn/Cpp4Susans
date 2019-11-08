const {getContextPath, getDataType, MethodType} = require('../castxml')

const getMethodName = (type, node) => {
  switch (type) {
    case MethodType.CONSTRUCTOR:
      return 'constructor'

    case MethodType.DESTRUCTOR:
      return 'destructor'

    case MethodType.METHOD:
      return node.attr('name')

    case MethodType.OPERATORMETHOD:
      return node.attr('name')

    default:
      throw new Error(`Unknown method type: ${type}`)
  }
}

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

const renderSignature = () => {
  const name = getMethodName(this.type, this.node)
  const suffix = this.isStatic ? '_static' : ''
  const args = this.args.length === 0
    ? '()'
    : '(\n' + renderArgs(this.$, this.args) + '\n)'
  return (
    this.returns + ' ' +
    getContextPath(this.$, this.node) + '_' + name + suffix +
    args
  )
}

const renderHeader = () => {
  return `${this.renderSignature()};`
}

const renderImpl = () => {
  return `${this.renderSignature()} {

}`
}

module.exports = {
  renderHeader,
  renderImpl
}
