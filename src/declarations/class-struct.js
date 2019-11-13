const isPublic = (node) => {
  // console.log(node[0])
  return node.attr('access') === 'public'
}

// "Artificial" means default empty constructor and destructor
const isArtificial = (node) => {
  // console.log(node[0])
  return node.attr('artificial') === '1'
}

const getMemberIds = (node) => {
  // console.log(node[0])
  const members = node.attr('members')
  return members.split(' ')
}

const collectClassOrStruct = ($, node, collect) => {
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
      case 'FIELD':
      case 'VARIABLE': {
        fields.push(collect(member))
        break
      }

      case 'CONSTRUCTOR': {
        constructors.push(collect(member))
        break
      }

      case 'DESTRUCTOR': {
        destructors.push(collect(member))
        break
      }

      case 'METHOD': {
        const method = collect(member)
        if (method.isStatic) {
          staticMethods.push(method)
        } else {
          methods.push(method)
        }
        break
      }

      case 'OPERATORMETHOD':
      case 'CONVERTER': {
        operators.push(collect(member))
        break
      }

      case 'ENUMERATION': {
        enums.push(collect(member))
        break
      }

      case 'CLASS': {
        classes.push(collect(member))
        break
      }

      case 'STRUCT': {
        structs.push(collect(member))
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
    type: node.prop('nodeName'),  // 'CLASS' or 'STRUCT'
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

const register = (registry) => {
  registry['CLASS'] = collectClassOrStruct
  registry['STRUCT'] = collectClassOrStruct
}

module.exports = {
  register
}
