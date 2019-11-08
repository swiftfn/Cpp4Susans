const {Enum} = require('./enum')
const {Method, MethodType} = require('./method')
const {getDataType, getMemberIds, isArtificial, isPublic} = require('./util')

class ClassOrStruct {
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

    this.enums = []
    this.classes = []
    this.structs = []

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

        case 'CLASS': {
          this.structsAndClasses.push(new Class(this.$, member))
          break
        }

        case 'STRUCT': {
          this.structsAndClasses.push(new Struct(this.$, member))
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
}

const renderGroups = (groups, renderMember) =>
  groups.map((group) =>
    group.map((member) =>
      renderMember(member)
    ).join('\n')
  ).join('\n')

module.exports = {
  StructOrClass,
  renderGroups
}
