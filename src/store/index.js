import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import logger from 'redux-logger'

const thunk = store => next => action =>
  typeof action === 'function' ? action(next, store.getState) : next(action)

const configureStore = () => {
  const middlewares = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }
  const store = createStore(reducer, applyMiddleware(...middlewares))
  return store
}

export default configureStore
