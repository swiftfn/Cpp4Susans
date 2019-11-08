const {getContextPath, getDataType} = require('./util')

const MethodType = Object.freeze({
  CONSTRUCTOR: Symbol('CONSTRUCTOR'),
  DESTRUCTOR: Symbol('DESTRUCTOR'),
  NORMAL: Symbol('METHOD'),
  OPERATOR: Symbol('OPERATOR')
})

const getMethodName = (type, node) => {
  switch (type) {
    case MethodType.CONSTRUCTOR:
      return 'constructor'

    case MethodType.DESTRUCTOR:
      return 'destructor'

    case MethodType.NORMAL:
      return node.attr('name')

    case MethodType.OPERATOR:
      return node.attr('name')

    default:
      break;
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

class Method {
  constructor($, node, isStatic, type) {
    this.$ = $
    this.node = node

    this.isStatic = isStatic
    this.type = type

    this.returns = type === MethodType.CONSTRUCTOR
      ? getContextPath($, node)
      : type === MethodType.DESTRUCTOR
        ? 'void'
        : getDataType($, node.attr('returns'))
    this.args = node.children('Argument')
  }

  renderCSignature() {
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

  renderCHeader() {
    return `${this.renderCSignature()};`
  }

  renderCImpl() {
    return `${this.renderCSignature()} {

}`
  }

  renderSwift() {
    return `TODO`
  }
}

module.exports = {
  Method,
  MethodType
}
