// Registry is for avoiding cyclic dependencies among .js files
const createRegistry = (mods) => {
  const registry = {}
  for (const mod of mods) {
    mod.register(registry)
  }
  return registry
}

module.exports = {
  createRegistry
}
