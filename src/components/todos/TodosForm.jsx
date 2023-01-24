import React, { useReducer, useState } from 'react'
import { TodoList } from '../Todo/TodoList'
import "./TodosForm.css"

export const ACTIONS =  {
 ADD_TODO: "ADD_TODO",
 COMPLETE_TODO: "COMPLETE_TODO",
 DELETE_TODO: "DELETE_TODO",
 EDIT_TODO: "EDIT_TODO"
}

const todoReducer = (todos, action) => {
 if(action.type === ACTIONS.ADD_TODO){
  return[
   ...todos,
   newTodo(action.payload.value)
  ]
 }

 if(action.type === ACTIONS.COMPLETE_TODO){
  return todos.map((item) => {
   if(item.id === action.payload.id){
    return{ ...item, complete: !item.complete}
   }
   return item
  })
 }

 if(action.type === ACTIONS.DELETE_TODO){
  return todos.filter(elem => elem.id !== action.payload.id)
 }
 return todos
}

const newTodo = (title) => {
 return{ id: Date.now(), value: title, complete: false}
}
export const TodosForm = () => {
  const [todos, todoDispatch] = useReducer(todoReducer, [])
  const [title, setTitle] = useState("")
  
   const titleInputChange = (e) => {
    setTitle(e.target.value)
   } 
   const submitTodo = (e) => {
    e.preventDefault()
    todoDispatch({ type: ACTIONS.ADD_TODO, payload: {value: title}})
    setTitle('')
   }

   console.log(title);

  return (
    <div className='todos'>
     <div className="todos__content">
      <h1>ToDo List</h1>

      <div className="todos__forms">

       <form className='todos__form' onSubmit={submitTodo}>
        <input 
         type="text"
         className='todos__input'
         placeholder='Add todo'
         value={title}
         onChange={titleInputChange}/>
       </form>

       <button 
       className='todos__add__btn'
       onClick={submitTodo}
       >Add</button>
      </div>

      <div className="todos__list">
       {
        todos.map((item) => (
         <TodoList 
           key={item.id}
           todos={item}
           todoDispatch={todoDispatch}
           />
        ))
       }
       </div>
     </div>
    </div>
  )
}
