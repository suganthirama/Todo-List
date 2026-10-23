function TodoForm() {
    return (
        <form>
            <label htmlFor="title">Todo</label>
            <input type="text" id="title"></input>
            <button type="submit" disabled>Add Todo</button>
        </form>
    )
}

export default TodoForm;