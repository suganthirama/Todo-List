
import './App.css'

function App() {

  const todoList= [
    {id:1, title: "Learn React"},
    {id:2, title: "Build a Project"},
    {id:3, title: "Practice Javascript"}
  ];
  return (
      <div>
        <h1>My Todos</h1>
        <ul>
          {todoList.map(todo =>(<li key={todo.id}>{todo.title}</li>))}
        </ul>
      </div>
  )
}
export default App
