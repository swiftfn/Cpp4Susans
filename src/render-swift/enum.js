const render = ($, declaration) => {
  const name = declaration.node.attr('name')
  return `public enum ${name} {

}`
}

module.exports = {
  render
}
