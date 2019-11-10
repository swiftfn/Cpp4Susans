const renderStruct = ($, declaration) => {

}

const register = (registry) => {
  registry['STRUCT'] = renderStruct
}

module.exports = {
  register
}
