exports.isTopScope = (node) => {
  // "incomplete" means forward declaration
  return node.attr('context') === '_1' && node.attr('incomplete') !== '1'
}

exports.isPublic = (node) => {
  // console.log(node[0])
  return node.attr('access') === 'public'
}

exports.getMemberIds = (node) => {
  // console.log(node[0])
  const members = node.attr('members')
  return members.split(' ')
}

exports.getDataType = ($, node) => {

}
