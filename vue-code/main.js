import Myvue from './myvue/index.js'

const app = new Myvue({
  el: '#app',
  data () {
    return {
      message: {
        name: 'jack',
        age: '20',
        score: '100'
      },
      friends: ['a', 'b']
    }
  }
})

setTimeout(() => {
  app.friends[0] = 'c'
}, 1000)
