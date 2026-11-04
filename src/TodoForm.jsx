

import { useState} from 'react';
import TodoListItem from "./TodoListItem.jsx";

function TodoForm({onAddTodo}) {

    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(workingTodoTitle);
        setWorkingTodoTitle('');
    }

    return (
        <form onSubmit={handleAddTodo}>
            <input
                type="text"
                name="todoTitle"
                value={workingTodoTitle}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button type="submit" disabled={!workingTodoTitle.trim()}>
                Add Todo
            </button>
        </form>
    );
};
export default TodoForm
