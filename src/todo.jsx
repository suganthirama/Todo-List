

function Todo() {
    const todoList= [
        {id:1, title: "Learn React"},
        {id:2, title: "Build a Project"},
        {id:3, title: "Practice Javascript"}
    ];
    return(
        <ul>
            {todoList.map(todo =>(<li key={todo.id}>{todo.title}</li>))}
        </ul>
    )
}

export default Todo