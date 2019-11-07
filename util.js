const getMemberIds = (node) => {
  const members = node.attr('members')
  return members.split(' ')
}

module.exports = {
  getMemberIds
}
