import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [toDoList, setToDoList] = useState([]);
  // code commented below to use local storage
  //    {id:"12", note:"testnote"},
  //    {id:"13", note:"testnote is here"}
  //  ])

  // only run once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem("exampleTodoList")) {
      setToDoList(JSON.parse(localStorage.getItem("exampleTodoList")));
    }
  }, []);

  // run every time our pet state changes
  useEffect(() => {
    localStorage.setItem("exampleTodoList", JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    //Key to be added to list ul which has to be unique else warning
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!!</h2>
      <TodoForm setToDoList={setToDoList} />
      <ul>
        {toDoList.map((todo) => (
          <ToDo key={todo.id} id={todo.id} note={todo.note} />
        ))}
      </ul>
    </div>
  );
}

// React component that display have to be starting with caps
function TodoForm(props) {
  const [name, setName] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    props.setToDoList((prev) =>
      prev.concat({ id: new Date().getTime(), note: name })
    );
    setName("");
  }
  return (
    // Neded to have name || "" else undefined to defined transition
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button>Add Pet</button>
      </fieldset>
    </form>
  );
}

function ToDo(props) {
  return <li id={props.id}>{props.note}</li>;
}
