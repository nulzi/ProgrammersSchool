import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ClassCom from "./components/ClassCom";
import FuncCom from "./components/FuncCom";
import TodoList from "./components/TodoList";
import Timer from "./components/Timer";
import Clock from "./components/Clock";
import Props from "./components/Props";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <ClassCom></ClassCom>
      <FuncCom></FuncCom> */}
      <TodoList></TodoList>
      <Timer></Timer>
      <Clock></Clock>
      <Props weather="sunny">Weather Forecast</Props>
    </div>
  );
}

export default App;
