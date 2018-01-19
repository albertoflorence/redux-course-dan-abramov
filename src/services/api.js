const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const fakeData = [
  {
    id: '123',
    text: 'fakeTodo',
    completed: true
  },
  {
    id: '124',
    text: 'anotherFakeTodo',
    completed: false
  },
  {
    id: '125',
    text: 'onMorefakeTodo',
    completed: true
  },
  {
    id: '126',
    text: 'whyNotFakeTodo',
    completed: false
  },
  {
    id: '127',
    text: 'xDFakeTodo',
    completed: false
  }
]

export const fetchTodos = filter =>
  delay(800).then(() => {
    if (Math.random() * 10 < 2) throw new Error('BOOOOOOOOOM !')
    switch (filter) {
      case 'all':
        return fakeData
      case 'active':
        return fakeData.filter(data => !data.completed)
      case 'completed':
        return fakeData.filter(data => data.completed)
      default:
        throw new Error(`The ${filter} is not a valid filter`)
    }
  })

let nextTodoId = new Date().getTime() * Math.random()

export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: nextTodoId++,
      completed: false,
      text
    }
    fakeData.push(todo)
    return todo
  })

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = fakeData.find(todo => todo.id === id)
    todo.completed = !todo.completed
    return todo
  })
