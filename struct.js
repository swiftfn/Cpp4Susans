const {getMemberIds} = require('./util')

class Struct {
  constructor($, container) {
    this.$ = $
    this.container = container

    this.staticFields = []
    this.staticMethods = []
    this.fields = []
    this.constructors = []
    this.destructors = []
    this.methods = []
    this.operators = []

    this.collect()
  }

  collect() {
    const memberIds = getMemberIds(this.container)
    // console.log(memberIds)

    for (const id of memberIds) {
      const member = this.$(`[id="${id}"]`)

      const type = member.prop('nodeName')
      switch (type) {
        case 'FIELD':
          this.fields.push(member)
          break

        case 'CONSTRUCTOR':
          this.constructors.push(member)
          break

        case 'DESTRUCTOR':
          this.destructors.push(member)
          break

        case 'METHOD':
          this.methods.push(member)
          break

        case 'OPERATORMETHOD':
          this.operators.push(member)
          break

        default:
          console.log(`Unhandled struct member type "${type}"`, member)
      }
    }
  }

  render() {
    return `
struct ${this.container.attr('name')} {

}
`
  }
}

module.exports = {
  Struct
}
