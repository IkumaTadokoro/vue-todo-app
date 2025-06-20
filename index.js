const STORAGE_KEY = 'vue-todo-app'
const todoStorage = {
  fetch () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    return todos
  }
}

const app = Vue.createApp({
  data () {
    return {
      todos: todoStorage.fetch(),
      newTodo: null,
      editId: null
    }
  },
  methods: {
    add () {
      if (!this.newTodo) return
      this.todos.push({ id: this.$_app_getNewId(), content: this.newTodo })
      this.save()
      this.newTodo = null
    },
    destroy (id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.save()
    },
    edit (id) {
      this.editId = id
    },
    update () {
      this.editId = null
      this.save()
    },
    save () {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    $_app_getNewId () {
      const usedIds = this.todos.reduce((accumulator, todo) => {
        accumulator[todo.id] = true
        return accumulator
      }, [])
      const nextid = usedIds.findIndex((exists) => !exists)
      return nextid < 0 ? usedIds.length : nextid
    }
  }
})

app.mount('#app')
