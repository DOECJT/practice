const defaultREG = /\{\{((?:.|\r?\n)+?)\}\}/g
export const util = {
  compilerText (node, vm) {
    node.textContent = node.textContent.replace(defaultREG, function (...arg) {
      return util.getValue(vm, arg[1])
    })
  },
  getValue (vm, exp) {
    let keys = exp.split('.')
    return keys.reduce((acc, curr) => {
      return acc[curr]
    }, vm)
  }
}
export function compiler(node, vm) {
  let childNodes = node.childNodes
  for (let child of childNodes) {
    if (child.nodeType === 1) {
      compiler(child, vm)
    } else if (child.nodeType === 3) {
      util.compilerText(child, vm)  
    }
  }
}