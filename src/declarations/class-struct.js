const {getDataType, getMemberIds, isArtificial, isPublic} = require('../util')

const {collectEnum} = require('./enum')
const {collectField} = require('./field')
const {MethodType, collectMethod} = require('./method')

const collectClassOrStruct = ($, node) => {
  const staticFields = []
  const staticMethods = []

  const fields = []
  const constructors = []
  const destructors = []
  const methods = []
  const operators = []

  const enums = []
  const structs = []
  const classes = []

  const memberIds = getMemberIds(node)
  // console.log(memberIds)

  for (const id of memberIds) {
    const member = $(`[id="${id}"]`)
    // console.log(member.attr('name'))

    if (!isPublic(member) || isArtificial(member)) {
      // console.log(member[0])
      continue
    }

    const type = member.prop('nodeName')
    switch (type) {
      case 'FIELD': {
        fields.push(collectField($, member))
        break
      }

      case 'CONSTRUCTOR': {
        constructors.push(collectMethod($, member))
        break
      }

      case 'DESTRUCTOR': {
        destructors.push(collectMethod($, member))
        break
      }

      case 'METHOD': {
        const method = collectMethod($, member)
        if (method.isStatic) {
          staticMethods.push(method)
        } else {
          methods.push(method)
        }
        break
      }

      case 'OPERATORMETHOD': {
        operators.push(collectMethod($, member))
        break
      }

      case 'ENUMERATION': {
        enums.push(collectEnum($, member))
        break
      }

      case 'CLASS': {
        classes.push(collectClassOrStruct($, member))
        break
      }

      case 'STRUCT': {
        structs.push(collectClassOrStruct($, member))
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

  return {
    type: node.prop('nodeName').toLowerCase(),  // 'class' or 'struct'
    node,

    staticFields,
    staticMethods,

    fields,
    constructors,
    destructors,
    methods,
    operators,

    enums,
    classes,
    structs
  }
}

module.exports = {
  collectClassOrStruct
}
