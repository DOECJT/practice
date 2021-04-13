import Observe from './Observe.js'
import Deps from './Deps.js'

export function initState(vm) {

  if (vm.$options.data) {
    initData(vm)
  }
} 

export function initData(vm) {
  let data = vm.$options.data
  // 判断data的类型，function或object
  data = vm.$data =  typeof data === 'function' ? data.call(vm) : data
  // 代理data
  proxy(vm, vm.$data)
  // 监听data
  observe(data)
}

export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return
  }
  return new Observe(data)
}

export function defineReactive(data, key, value) {
  // 判断value的类型，如果value是对象，则继续监听value
  if (typeof value === 'object') {
    observe(value)
  }
  let deps = new Deps()
  Object.defineProperty(data, key, {
    get () {
      if (Deps.target) {
        deps.addSub(Deps.target)
      }
      return value
    },
    set (newValue) {
      if (newValue === value) {
        return
      }
      console.log(`${key}改变了：${value}=>${newValue}`)
      // 判断newValue的类型，属性为对象时可以继续监听对象的属性
      if (typeof newValue === 'object') {
        observe(newValue)
      }
      value = newValue
    }
  })
}

/**
 * vm代理vm.$data
 */
export function proxy(vm, data) {
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    Object.defineProperty(vm, keys[i], {
      get () {
        return data[keys[i]]
      },
      set (newValue) {
        data[keys[i]] = newValue
      }
    })
  }
}
