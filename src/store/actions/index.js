import * as schema from './schema'
import { getIsFetching } from '../reducers'
import * as api from '../../services/api'
import { normalize } from 'normalizr'

export const toggleTodo = id => dispatch =>
  api.toggleTodo(id).then(
    response => dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  )

export const addTodo = text => dispatch =>
  api.addTodo(text).then(response =>
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  )

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) return
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  })
  api.fetchTodos(filter).then(
    response =>
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfTodos)
      }),
    error =>
      dispatch({
        type: 'FETCH_TODOS_FAILURE', message: error.message || 'Something went wrong !',
        filter
      }))

}
