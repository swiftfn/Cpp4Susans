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
      console.log(member[0])

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
          if (member.attr('static') === '1') {
            this.staticMethods.push(member)
          } else {
            this.methods.push(member)
          }
          break

        case 'OPERATORMETHOD':
          this.operators.push(member)
          break

        default:
          console.log(`Unhandled struct member type "${type}"`, member)
      }
    }
  }

  renderC() {
    const name = this.container.attr('name') + '_struct'
    return `
typedef struct ${name} ${name};
`
  }

  renderSwift() {
    console.log('this.staticFields', this.staticFields)
    console.log('this.staticMethods', this.staticMethods)
    console.log('this.fields', this.fields)
    console.log('this.constructors', this.constructors)
    console.log('this.destructors', this.destructors)
    console.log('this.methods', this.methods)
    console.log('this.operators', this.operators)

    const name = this.container.attr('name')
    return `
public struct ${name} {

}
`
  }
}

module.exports = {
  Struct
}
