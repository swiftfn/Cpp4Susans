// https://github.com/Leonidas-from-XIV/node-xml2js

const fs = require('fs')
const xml2js = require('xml2js').parseStringPromise

const XML = 'xml/SkSize.xml'
const H = 'SkSize.h'

const loadXml = async (fileName) => {
  const xml = fs.readFileSync(fileName)
  return await xml2js(xml, {explicitRoot: false, explicitChildren: true, preserveChildrenOrder: true})
}

const getHeaderFileId = (root, fileName) => {
  const nodes = root.File
  // console.log(nodes)

  const node = nodes.find(node => node.$.name.endsWith(`/${fileName}`))
  // console.log(node)
  return node.$.id
}

const filterTypeByFileId = (nodes, fileId) => {
  return nodes.filter(node => node.$.file === fileId)
}

const getMemberIds = (node) => {
  const {members} = node.$
  return members.split(' ')
}

const findNodeById = (root, id) => {
  const types = Object.keys(root)
  for (const type of types) {
    const nodes = root[type]
    for (const node of nodes) {
      if (node.$.id === id) {
        return node
      }
    }
  }
  return undefined
}

const handleStruct = (node) => {
  const memberIds = getMemberIds(localNodes[0])
  console.log(memberIds)

  const member = findNodeById(root, memberIds[0])
  console.log(member)

  console.log(findNodeById(root, '_78'))
  console.log(findNodeById(root, '_1924'))
}

async function main() {
  const root = await loadXml(XML)
  // console.log(root)

  console.log(JSON.stringify(root, null, 2))
  process.exit(0)

  delete root.$

  const types = Object.keys(root).sort()
  console.log(types)

  const fileId = getHeaderFileId(root, H)

  for (const type of types) {
    const typeNodes = root[type]
    const localNodes = filterTypeByFileId(typeNodes, fileId)
    console.log(localNodes)

    // switch (type)'Struct') {
    //   handleStruct(structs[0])
    // }
  }
}
main()
