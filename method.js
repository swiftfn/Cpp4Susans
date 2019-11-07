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

class Method {
  constructor(parentName, isStatic, type, node) {
    this.parentName = parentName
    this.isStatic = isStatic
    this.type = type
    this.node = node
  }

  renderCSignature() {
    const name = getMethodName(this.type, this.node)
    return `${this.parentName}_${name}()`
  }

  renderCHeader() {
    return `${this.renderCSignature()};`
  }

  renderCImpl() {
    return `${this.renderCSignature()} {}`
  }

  renderSwift() {
    return `TODO`
  }
}

module.exports = {
  Method,
  MethodType
}
