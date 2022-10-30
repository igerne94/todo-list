import React from 'react';
import './App.css';

type TodoItem = { 
  id: number;
  title: string;
  ifCompleted: boolean;
}

type TodoArray = {
  todos: TodoItem[],
}

function App() {
  const [todos, setTodos] = React.useState<TodoArray>({ todos: [] });
  const addTodos = (title: string) => { 
    setTodos({
      todos: [
        {
          title, 
          ifCompleted: false, 
          id: todos.todos.length+1
        }, 
        ...todos.todos
      ]
    });
  };

  const deleteTodos = (id: number) => {
    setTodos({
      todos: todos.todos.filter(t => t.id !== id)
    });
  };

  const toggleTodos = (id: number) => {
    setTodos({
      todos: todos.todos.map(
        todo => todo.id === id ? 
          {...todo, ifCompleted: !todo.ifCompleted} 
        : todo)
    });
  }

  return (
    <div className="App">
      <AddTodoComponent addTodos={addTodos} />
      <hr />
      <TodosComponent 
        todos={todos} 
        toggleTodos={toggleTodos}
        deleteTodos={deleteTodos} />
    </div>
  );
}


const TodosComponent: 
  React.FC<{
    todos: TodoArray, 
    toggleTodos: (id: number) => void,
    deleteTodos: (id: number) => void
  }> = ({todos, toggleTodos, deleteTodos}) => {
    const deleteTodo = (id: number) => {
      if (window.confirm(`Are you sure you want to delete todo?`)) {
        deleteTodos(id);
      }
    }

    return (
      <div className="section__todos">
      <h2>Todos</h2>
      {todos.todos.length ? 
        <ul className="todos">
          {todos.todos.map(todo => (
            <li key={todo.id}>
              <span style={{textDecoration: todo.ifCompleted? 'line-through': 'none'}}>
                {todo.title}
              </span>
              <input 
                type="checkbox" 
                checked={todo.ifCompleted} 
                onChange={() => toggleTodos(todo.id)} 
              />
              <button onClick={() => {deleteTodo(todo.id)}}>
                X
              </button>
            </li>
          ))}
        </ul>
      : <div>No Todo has been created</div>}
    </div>
    );
};

const styles = {
  container: {
    width: 300,
    height: 300,
    margin: '50px auto',
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold",
  },
} as const;

const AddTodoComponent = ({ addTodos } : { addTodos: (text: string) => void }) => {
  const [todo, setTodo] = React.useState<string>("");
  const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!todo) {
      alert("Please enter a todo");
    } else {
      addTodos(todo);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <header><h1>TODO list</h1></header>
      {/* <article> */}
        <div style={styles.container}>
          <div className="col-md-6">
            <input
              value={todo}
              onChange={event => {setTodo(event.target.value)}}
            />
          </div>
          <div className="col-md-6">
            <button onClick={submit}>Add</button>
          </div>
        </div>
      {/* </article> */}
    </div>
  );
};

export default App;