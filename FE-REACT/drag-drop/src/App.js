import logo from "./logo.svg";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
  },
  {
    id: "cato",
    name: "little cato",
  },
  {
    id: "kvn",
    name: "kvn",
  },
];

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  const handleEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharacters(items);
  };

  return (
    <div className="App">
      <header>
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {characters.map(({ id, name }, idx) => (
                  <Draggable key={id} draggableId={id} index={idx}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
