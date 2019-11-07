const getMemberIds = (node) => {
  const members = node.attr('members')
  return members.split(' ')
}

const getDataType = ($, node) => {

}

module.exports = {
  getMemberIds
}
