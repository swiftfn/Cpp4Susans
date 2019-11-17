const {getContext, getContextPath} = require('../castxml/context')

const isValidCNameChar = (char) =>
  ('a' <= char && char <= 'z') ||
  ('A' <= char && char <= 'Z') ||
  ('0' <= char && char <= '9') ||
  ['_'].includes(char)

// Skia's
// ```
// template <SkAlphaType kAT>
// struct SkRGBA4f
// ```
// is parsed to `SkRGBA4f<kPremul_SkAlphaType>` and `SkRGBA4f<kUnpremul_SkAlphaType>`.
// We need to convert `<` and `>` to `_` so that it's valid in C.
const convertCNameWithTemplate = (name) =>
  Array.from(name).map(c => isValidCNameChar(c) ? c : '_').join('')

const withContextPath = ($, node, name) => {
  const path = getContextPath($, node).map(convertCNameWithTemplate).join('_')
  const prefix = path ? path + '_' : ''
  return prefix + convertCNameWithTemplate(name)
}

const getCDataType = ($, idOrNode) => {
  const node = typeof idOrNode === 'string' ? $(`[id="${idOrNode}"]`) : idOrNode
  const nodeName = node.prop('nodeName')
  const id = node.attr('id')
  const type = node.attr('type')
  const name = node.attr('name')

  switch (nodeName) {
    case 'FUNDAMENTALTYPE': {
      return {
        category: nodeName,
        name
      }
    }

    case 'CLASS': {
      return {
        category: nodeName,
        name: withContextPath($, node, name) + '_class'
      }
    }

    case 'STRUCT': {
      return {
        category: nodeName,
        name: withContextPath($, node, name) + '_struct'
      }
    }

    case 'ENUMERATION': {
      return {
        category: nodeName,
        name: withContextPath($, node, name)
      }
    }

    case 'TYPEDEF': {
      return name === 'nullptr_t'
        ? 'nullptr_t'
        : getCDataType($, type)
    }

    case 'REFERENCETYPE': {
      return {
        ...getCDataType($, type),
        ref: true
      }
    }

    case 'POINTERTYPE': {
      const t = getCDataType($, type)
      t.name += '*'
      return {
        ...t,
        pointer: true
      }
    }

    case 'FUNCTIONTYPE': {
      return 'TODO FUNCTIONTYPE'
    }

    case 'ARRAYTYPE': {
      return 'TODO ARRAYTYPE'
    }

    // https://en.cppreference.com/w/cpp/language/cv
    case 'CVQUALIFIEDTYPE': {
      return getCDataType($, type)
    }

    default: {
      throw new Error(`Unknown data type: ${nodeName}, id: ${id}`)
    }
  }
}

const getCppContainerName = ($, node) =>
  getContextPath($, node).join('::')

const getMethodCReturnType = ($, node, methodType, returns) =>
  methodType === 'CONSTRUCTOR'
    ? getCDataType($, getContext($, node)).name + '*'
    : methodType === 'DESTRUCTOR'
      ? 'void'
      : getCDataType($, returns).name

module.exports = {
  withContextPath,
  getCDataType,
  getCppContainerName,
  getMethodCReturnType
}
