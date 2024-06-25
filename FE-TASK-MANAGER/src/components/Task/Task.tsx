import React, { FC } from "react";
import { container, description, title } from "./Task.css";

type TTaskProps = {
  id: string;
  index: number;
  taskName: string;
  taskDescription: string;
  boardId: string;
};

const Task: FC<TTaskProps> = ({
  id,
  index,
  taskName,
  boardId,
  taskDescription,
}) => {
  return (
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={description}>{taskDescription}</div>
    </div>
  );
};

export default Task;
