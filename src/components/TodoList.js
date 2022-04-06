import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodoAsync,
  toggleTodoAsync,
  getTodosAsync,
} from "../redux/todos/services";
import { selectFilteredTodos } from "../redux/todos/todosSlice";

import Error from "./Error";
import Loading from "./Loading";
function TodoList() {
  const dispatch = useDispatch();

  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  const handleDestroy = async (id) => {
    if (window.confirm("Are you sure")) {
      await dispatch(removeTodoAsync(id));
    }
  };
  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <ul className="todo-list">
        {/* <li className="completed">
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>Learn JavaScript</label>
            <button className="destroy"></button>
          </div>
        </li> */}
        {filteredTodos.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={item.completed}
                onChange={() =>
                  dispatch(handleToggle(item.id, !item.completed))
                }
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => dispatch(handleDestroy(item.id))}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
