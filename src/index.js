const glob = require('glob')

const {writeCFiles} = require('./render-c')
const {writeSwiftFiles} = require('./render-swift')

const main = () => {
  // const castXmls = ['input/SkMatrix.xml']

  const castXmls = glob.sync('input/*.xml')
  // const skipToIdx = castXmls.findIndex((path) => path.endsWith('/SkYUVAIndex.xml'))
  // castXmls.splice(0, skipToIdx)

  writeCFiles(castXmls)
  writeSwiftFiles(castXmls)
}

main()
