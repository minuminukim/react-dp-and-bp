import { FC, useEffect, memo } from 'react';

import Task from './Task';

export type Todo = {
  id: number;
  task: string;
};

interface Props {
  todoList: Todo[];
  handleDelete: any;
}

const List: FC<Props> = ({ todoList, handleDelete }) => {
  useEffect(() => {
    // console.log('Rendering <List />');
  });

  return (
    <ul>
      {todoList.map((todo: Todo) => (
        <Task
          key={todo.id}
          id={todo.id}
          task={todo.task}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

// memo HOC performs a shallow comparison of props and re-renders only when a
// prop changes its value
export default memo(List);
