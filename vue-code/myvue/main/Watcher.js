import Deps from './Deps.js'

export default class Watcher {
  constructor (vm, fn) {
    fn()
    this.update = fn
    Deps.target = this
  }
}
