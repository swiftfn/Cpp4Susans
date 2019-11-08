const renderFunctionImpl = ($, declaration) => {

}

const register = (registry) => {
  registry['function'] = renderFunctionImpl
}

module.exports = {
  register
}
