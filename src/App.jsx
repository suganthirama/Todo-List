
import './App.css'
import TodoList from './TodoList.jsx'
import TodoForm from './TodoForm.jsx'
import { useState } from 'react';

function App() {
    const [todoList, setTodoList] = useState([]);

    function addTodo(todoTitle){
        const newTodo = {
            id: Date.now(),
            title: todoTitle,
            isCompleted: false,
        };
        setTodoList(previous => [newTodo, ...previous])
   
    }
    const completeTodo = (id) => {
        const updatedtodoList = todoList.map((todo) => {
            if (todo.id === id) {
                return {...todo, isCompleted: true};
            }
            return todo;
        });
        setTodoList(updatedtodoList);
    };
    return (
        <div>
            <h1>My Todos</h1>
            <TodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} onCompleteTodo ={completeTodo }/>
        </div>
    )
}
export default App
