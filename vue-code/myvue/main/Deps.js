export default class Deps {
  constructor () {
    this.deps = []
  }
  addSub (watcher) {
    this.deps.push(watcher)
  }
  notify () {
    this.deps.forEach(watcher => {
      watcher.update()
    })
  }
}