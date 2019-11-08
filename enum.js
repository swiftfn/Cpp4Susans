const {getMemberIds} = require('./util')

class Enum {
  constructor($, container) {
    this.$ = $
    this.container = container
    this.values = this.container.children('EnumValue')
  }

  renderCHeader() {
    const name = this.container.attr('name') + '_enum'
    return `
enum ${name} {

}
`
  }

  renderSwift() {
    console.log('this.fields', this.fields)

    const name = this.container.attr('name')
    return `
public enum ${name} {

}
`
  }
}

module.exports = {
  Enum
}
