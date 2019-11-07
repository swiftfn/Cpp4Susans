const {Enum} = require('./enum')
const {Method, MethodType} = require('./method')
const {isPublic, getMemberIds} = require('./util')

class StructOrClass {
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

    this.structsAndClasses = []
    this.enums = []

    this.collect()
  }

  collect() {
    const parentName = this.container.attr('name')
    const memberIds = getMemberIds(this.container)
    // console.log(memberIds)

    for (const id of memberIds) {
      const member = this.$(`[id="${id}"]`)
      // console.log(member.attr('name'))

      if (!isPublic(member)) {
        // console.log(member[0])
        continue
      }

      const type = member.prop('nodeName')
      switch (type) {
        case 'FIELD': {
          this.fields.push(member)
          break
        }

        case 'CONSTRUCTOR': {
          const method = new Method(parentName, false, MethodType.CONSTRUCTOR, member)
          this.constructors.push(method)
          break
        }

        case 'DESTRUCTOR': {
          const method = new Method(parentName, false, MethodType.DESTRUCTOR, member)
          this.destructors.push(method)
          break
        }

        case 'METHOD': {
          const isStatic = member.attr('static') === '1'
          const method = new Method(parentName, isStatic, MethodType.NORMAL, member)
          if (isStatic) {
            this.staticMethods.push(method)
          } else {
            this.methods.push(method)
          }
          break
        }

        case 'OPERATORMETHOD': {
          const method = new Method(parentName, false, MethodType.OPERATOR, member)
          this.operators.push(method)
          break
        }

        case 'ENUMERATION': {
          this.enums.push(new Enum(this.$, member))
          break
        }

        case 'STRUCT':
        case 'CLASS': {
          this.structsAndClasses.push(new StructOrClass(this.$, member))
          break
        }

        case 'TYPEDEF': {
          // Ignore
          break
        }

        default: {
          throw new Error(`Unhandled struct/class member type "${type}": ${member}`)
        }
      }
    }
  }

  renderCHeader() {
    const name = this.container.attr('name') + '_struct'
    return `
// Inner enums
${this.enums.map(m => m.renderCHeader()).join('\n')}

// Inner structs/classes
${this.structsAndClasses.map(m => m.renderCHeader()).join('\n')}

typedef struct ${name} ${name};

// Static methods
${this.staticMethods.map(m => m.renderCHeader()).join('\n')}

// Constructors
${this.constructors.map(m => m.renderCHeader()).join('\n')}

// Destructors
${this.destructors.map(m => m.renderCHeader()).join('\n')}

// Methods
${this.methods.map(m => m.renderCHeader()).join('\n')}

// Operators
${this.operators.map(m => m.renderCHeader()).join('\n')}
`
  }

  renderCImpl() {
    return `TODO`
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
    return `
public ${type === 'STRUCT' ? 'struct' : 'class'} ${name} {

}
`
  }
}

module.exports = {
  StructOrClass
}
