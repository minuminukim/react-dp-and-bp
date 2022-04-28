import { useState, useEffect, useMemo, useCallback } from 'react';

import List, { Todo } from './List';

const initialTodos = [
  { id: 1, task: 'Go shopping' },
  { id: 2, task: 'Pay the electricity bill' },
];

function App() {
  const [todoList, setTodoList] = useState(initialTodos);
  const [task, setTask] = useState('');
  const [term, setTerm] = useState('');

  useEffect(() => {
    console.log('Rendering <App />');
  });

  // We are manipulating state by logging it.
  // Memoize function passed as an arg in effect as alternative to moving it
  // inside the useEffect callback.
  const printTodoList = useCallback(() => {
    console.log('Changing todoList', todoList);
  }, [todoList]);

  useEffect(() => {
    printTodoList();
  }, [todoList, printTodoList]);

  const handleCreate = () => {
    const newTodo = {
      id: Date.now(),
      task,
    };

    setTodoList([...todoList, newTodo]);
    setTask('');
  };

  const handleSearch = () => {
    setTerm(task);
  };

  // Function gets passed as prop in subcomponents and regenerates every time we
  // have a new re-render. useCallback memoizes the function definition
  const handleDelete = useCallback(
    (taskId: number) => {
      const newTodoList = todoList.filter((todo: Todo) => todo.id !== taskId);
      setTodoList(newTodoList);
    },
    [todoList]
  );

  const filteredTodoList = useMemo(
    () =>
      todoList.filter((todo: Todo) => {
        console.log('Filtering...');
        return todo.task.toLowerCase().includes(term.toLowerCase());
      }),
    [term, todoList]
  );

  return (
    <>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleSearch}>Search</button>
      <List todoList={filteredTodoList} handleDelete={handleDelete} />
    </>
  );
}

export default App;
