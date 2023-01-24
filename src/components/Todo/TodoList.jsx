import React from 'react'
import "./TodoList.css"
import { ACTIONS } from '../todos/TodosForm'

export const TodoList = ({todos, todoDispatch}) => {

  const titleCompleted = () => {
    todoDispatch({ type: ACTIONS.COMPLETE_TODO, payload: {id: todos.id}})
  }
  
  const titleDeleted = () => {
    todoDispatch({ type : ACTIONS.DELETE_TODO, payload: {id: todos.id}})
  }

  return (
   <div className='todo__list'>

   <div style={{color: todos.complete ? "#a59c9c" : "#fff"}} className="todo__list_title">{todos.value}</div>

   <div className="todo__list_buttons">
    <button className='deleted-btn' onClick={titleDeleted}>DELETE</button>
    <input type="checkbox" onChange={titleCompleted} className="checkbox"/>
   </div>
   </div>
  )
}

