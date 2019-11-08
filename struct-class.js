const {Enum} = require('./enum')
const {Method, MethodType} = require('./method')
const {getDataType, getMemberIds, isArtificial, isPublic} = require('./util')

const renderGroups = (groups, renderMember) =>
  groups.map((group) =>
    group.map((member) =>
      renderMember(member)
    ).join('\n')
  ).join('\n')

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

    this.collectMembers()
  }

  collectMembers() {
    const memberIds = getMemberIds(this.container)
    // console.log(memberIds)

    for (const id of memberIds) {
      const member = this.$(`[id="${id}"]`)
      // console.log(member.attr('name'))

      if (!isPublic(member) || isArtificial(member)) {
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
          const method = new Method(this.$, member, false, MethodType.CONSTRUCTOR)
          this.constructors.push(method)
          break
        }

        case 'DESTRUCTOR': {
          const method = new Method(this.$, member, false, MethodType.DESTRUCTOR)
          this.destructors.push(method)
          break
        }

        case 'METHOD': {
          const isStatic = member.attr('static') === '1'
          const method = new Method(this.$, member, isStatic, MethodType.NORMAL)
          if (isStatic) {
            this.staticMethods.push(method)
          } else {
            this.methods.push(method)
          }
          break
        }

        case 'OPERATORMETHOD': {
          const method = new Method(this.$, member, false, MethodType.OPERATOR)
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
    return `
public ${type === 'STRUCT' ? 'struct' : 'class'} ${name} {

}
`
  }
}

module.exports = {
  StructOrClass
}
