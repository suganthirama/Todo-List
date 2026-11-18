

import { useState, useRef} from 'react';
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import { isValidTodoTitle } from '../../utils/todoValidation.js';


function TodoForm({onAddTodo}) {

    const [workingTodoTitle, setWorkingTodoTitle] = useState('');
    const todoTitleInput = useRef(null);

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({
            title: workingTodoTitle,
            isCompleted: false
        });
        setWorkingTodoTitle('');
    };

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                labelText="Todo"
                ref={todoTitleInput}
                value={workingTodoTitle}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
                Add Todo
            </button>

        </form>
    );
};
export default TodoForm
