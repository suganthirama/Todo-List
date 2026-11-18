
import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../../utils/todoValidation.js';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {

    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    };

    const handleEdit = (event) => {
        setWorkingTitle(event.target.value);
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        if (!isValidTodoTitle(workingTitle)) return;

        onUpdateTodo({
            ...todo,
            title: workingTitle
        });

        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <TextInputWithLabel
                        elementId={`todoTitle${todo.id}`}
                        labelText="Todo"
                        value={workingTitle}
                        onChange={handleEdit}
                    />

                    <button type="submit"
                            disabled={!isValidTodoTitle(workingTitle)}>
                        Save
                    </button>

                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <label>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => onCompleteTodo(todo.id)}
                        />
                        {todo.title}
                    </label>

                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                </>
            )}
        </li>
    );
}

export default TodoListItem;
