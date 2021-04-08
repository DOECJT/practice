import {defineReactive} from './index.js'

export default class Observe {
  constructor (data) {
    this.walk(data)
  }

  walk (data) {
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = data[keys[i]]
      defineReactive(data, key, value)
    }
  }
}
