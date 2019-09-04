import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/* Custum Hook */
// Configure custom hook to an initial state instead of hardcoding it. 
// Set a default value of 1 if no value is passed to parameter
function useCounter(initial=1) {
  const [count, setCount] = useState(initial);
  
  // Return an object
  return {
    count,
    setCount
  };

 /*
  // Better than returning an object: memoizing the returned object
  useMemo is another built-in Hook,
   which helps in performance optimization
   when there are expensive calculations such as recursion

  https://reactjs.org/docs/hooks-reference.html

  "A memoized function "remembers" the results corresponding to some set of specific inputs.
   Subsequent calls with remembered inputs return the remembered result rather than recalculating it"
  https://en.wikipedia.org/wiki/Memoization

  return useMemo(() => ({
    count, 
    setCount 
  }))

  We are not using useMemo in this example because there is no complex calculations
  */
}

function App() {
  const { count, setCount } = useCounter(5);

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
      <footer>
        <p>Tutorial source: <a href="https://blog.logrocket.com/simplifying-state-initializers-with-react-hooks/">LogRocket blog</a></p>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
