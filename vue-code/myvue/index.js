import {initState} from './main/index.js'
import Watcher from './main/Watcher.js'
import {compiler} from './main/Compile.js'

export default class Myvue {
  constructor (options) {
    // 初始化Myvue实例
    this._init(options)
  }

  _init (options) {
    // $表示vue实例的可读属性
    this.$options = options
    initState(this)
    // 初始化页面
    if (this.$options.el) {
      this.$mount()
    }
  }

  /**
   * 1.获取DOM树
   * 2.替换DOM树的内容
   * 3.将替换后的内容挂载到页面上
   */
  $mount () {
    let el = this.$options.el
    el = this.$el = document.querySelector(el)

    let updateComponent = () => {
      this._update()
    }
    new Watcher(this, updateComponent)
  }

  _update () {
    // 获取dom节点
    let node = document.createDocumentFragment()
    let firstChild
    while (firstChild = this.$el.firstChild) {
      node.appendChild(firstChild)
    }
    // 替换节点内容
    compiler(node, this)
    // 挂载节点
    this.$el.appendChild(node)
  }
}
