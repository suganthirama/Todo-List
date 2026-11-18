
import TodoList from './TodoList/TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState, useEffect } from 'react';

function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);



    async function fetchTodos() {
        setIsTodoListLoading(true);
        setError('');

        try {
            const params = new URLSearchParams({
                page: '0',
                limit: '99',
            });

            const response = await fetch(`/api/tasks?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
            });

            if (response.status === 401) {
                throw new Error('Unauthorized. Please log in again.');
            }

            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }

            const data = await response.json();

            setTodoList(data.tasks);

        } catch (error) {
            setError(`Error fetching todos: ${error.message}`);
        } finally {
            setIsTodoListLoading(false);
        }
    }


    // Fetch todos when token becomes available or changes
    useEffect(() => {
        if (token) {
            fetchTodos();
        }
    }, [token]);

    async function addTodo(newTodo) {
        const temporaryTodo = {
            ...newTodo,
            id: Date.now(),
        };

        setTodoList((currentTodos) => [
            ...currentTodos,
            temporaryTodo,
        ]);

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: temporaryTodo.title,
                    isCompleted: temporaryTodo.isCompleted,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            const savedTodo = await response.json();

            setTodoList((currentTodos) =>
                currentTodos.map((todo) =>
                    todo.id === temporaryTodo.id
                        ? savedTodo
                        : todo
                )
            );
        } catch (error) {
            setTodoList((currentTodos) =>
                currentTodos.filter(
                    (todo) => todo.id !== temporaryTodo.id
                )
            );

            setError(`Error adding todo: ${error.message}`);
        }
    }

    async function completeTodo(id) {
        const originalTodo = todoList.find(
            (todo) => todo.id === id
        );

        if (!originalTodo) return;

        setTodoList((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, isCompleted: true }
                    : todo
            )
        );

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    isCompleted: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to complete todo');
            }
        } catch (error) {
            setTodoList((currentTodos) =>
                currentTodos.map((todo) =>
                    todo.id === id ? originalTodo : todo
                )
            );

            setError(`Error completing todo: ${error.message}`);
        }
    }

    async function updateTodo(editedTodo) {
        const originalTodo = todoList.find(
            (todo) => todo.id === editedTodo.id
        );

        if (!originalTodo) return;

        setTodoList((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === editedTodo.id
                    ? editedTodo
                    : todo
            )
        );

        try {
            const response = await fetch(
                `/api/tasks/${editedTodo.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        title: editedTodo.title,
                        isCompleted: editedTodo.isCompleted,
                    }),
                }
            );

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(errorDetails || 'Failed to update todo');
            }

        } catch (error) {
            setTodoList((currentTodos) =>
                currentTodos.map((todo) =>
                    todo.id === editedTodo.id
                        ? originalTodo
                        : todo
                )
            );

            setError(`Error updating todo: ${error.message}`);
        }
    }

    return (
        <>
            {error && (
                <div role="alert">
                    <p>{error}</p>
                    <button onClick={() => setError('')}>
                        Clear Error
                    </button>
                </div>
            )}

            {isTodoListLoading && (
                <p>Loading todos...</p>
            )}

            <div>
                {/*<h1>My Todos</h1>*/}
                <TodoForm onAddTodo={addTodo} />
                <TodoList
                    todoList={todoList}
                    onCompleteTodo={completeTodo}
                    onUpdateTodo={updateTodo}
                />
            </div>
        </>
    );
}

export default TodosPage;
