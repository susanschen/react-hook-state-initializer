import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function useCounter() {
  const [count, setCount] = useState(1);

  return {
    count,
    setCount
  };
}

function App() {
  const { count, setCount } = useCounter(12);

  return (
    <div className="App">
      <ul>
        {Array.from({ length: count }).map((c, i) => (
          <li key={i}>
            <span role="img" ariallabel="cup">
              {" "}
              ☕️
            </span>
          </li>
        ))}
      </ul>
      <div className="buttonContainer">
        <button onClick={() => setCount(count + 1)}>More coffee</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
