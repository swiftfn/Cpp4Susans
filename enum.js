const {getDataType, getMemberIds} = require('./util')

const renderValue = ($, value) => {
  const node = $(value)
  const name = node.attr('name')
  const init = node.attr('init')
  return `  ${name} = ${init}`
}

const renderValues = ($, values) => {
  let acc = []
  values.each((idx, value) => {
    acc.push(renderValue($, value))
  })
  return acc.join(',\n')
}

class Enum {
  constructor($, container) {
    this.$ = $
    this.container = container
    this.values = this.container.children('EnumValue')
  }



  renderCHeader() {
    const name = getDataType(this.$, this.container)
    return `enum ${name} {
${renderValues(this.$, this.values)}
};`
  }

  renderSwift() {
    console.log('this.fields', this.fields)

    const name = this.container.attr('name')
    return `public enum ${name} {

}`
  }
}

module.exports = {
  Enum
}
