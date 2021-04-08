import {initState} from './main/index.js'

export default class Myvue {
  constructor (options) {
    // 初始化Myvue实例
    this._init(options)
  }

  _init (options) {
    // $表示vue实例的可读属性
    this.$options = options
    initState(this)
  }
}
