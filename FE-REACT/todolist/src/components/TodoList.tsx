import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DetailModal from "./DetailModal";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList: React.FC = () => {
  const title: string = "Today's Work";
  const [todos, setTodos] = useState<Todo[]>([
    { id: 0, text: "잠자기", isChecked: false },
    { id: 1, text: "공부하기", isChecked: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCheckedChange = (itemId: number) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleOpenDetail = (todo: Todo) => {
    setShowDetail(true);
    setSelectedTodo(todo);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <div>
          <input
            type="text"
            placeholder="add todo"
            style={{ marginRight: "10px" }}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            onClick={() => {
              addTodo();
            }}
          >
            Add
          </Button>
        </div>
        <ul className="board">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                onChange={() => {
                  handleCheckedChange(todo.id);
                }}
              />
              <span onClick={() => handleOpenDetail(todo)}>
                {todo.isChecked ? <del>{todo.text}</del> : todo.text}
              </span>
              <button
                className="delbutton"
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                Del
              </button>
            </li>
          ))}
        </ul>
        <DetailModal
          isOpen={showDetail}
          todo={selectedTodo}
          handleClose={handleCloseDetail}
        ></DetailModal>
      </div>
    </>
  );
};

export default TodoList;
