const {StructOrClass, renderGroups} = require('./struct-class')
const {getDataType} = require('./util')

class Class extends StructOrClass {
  renderCHeader() {
    const name = getDataType(this.$, this.container)

    const groups1 = [
      this.enums,
      this.structsAndClasses
    ]
    const groups2 = [
      this.staticMethods,
      this.constructors,
      this.destructors,
      this.methods,
      this.operators
    ]

    return `
${renderGroups(groups1, (member) => member.renderCHeader())}

typedef struct ${name} ${name};

${renderGroups(groups2, (member) => member.renderCHeader())}
`
  }

  renderCImpl() {
    const groups = [
      this.structsAndClasses,
      this.staticMethods,
      this.constructors,
      this.destructors,
      this.methods,
      this.operators
    ]
    return renderGroups(groups, (member) => member.renderCImpl())
  }

  renderSwift() {
    // console.log('this.staticFields', this.staticFields)
    // console.log('this.staticMethods', this.staticMethods)
    // console.log('this.fields', this.fields)
    // console.log('this.constructors', this.constructors)
    // console.log('this.destructors', this.destructors)
    // console.log('this.methods', this.methods.length)
    // console.log('this.operators', this.operators)
    // console.log('this.enums', this.enums)

    const type = this.container.prop('nodeName')
    const name = this.container.attr('name')

    const groups1 = [
      this.enums,
      this.structsAndClasses
    ]
    const groups2 = [
      this.staticMethods,
      this.constructors,
      this.destructors,
      this.methods,
      this.operators
    ]

    return `
public ${type === 'STRUCT' ? 'struct' : 'class'} ${name} {
${renderGroups(groups1, (member) => member.renderCHeader())}

typedef struct ${name} ${name};

${renderGroups(groups2, (member) => member.renderCHeader())}

}
`
  }
}

module.exports = {
  Class
}
