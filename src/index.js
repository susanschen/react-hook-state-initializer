import React, { useState, useCallback } from "react";
// import { useMemo } from "react"  if you are using this built-in hook
import ReactDOM from "react-dom";

import "./styles.css";

/* Custum Hook */
// Configure custom hook to an initial state instead of hardcoding it. 
// Set a default value of 1 if no value is passed to parameter
function useCounter(initial=1) {
  const [count, setCount] = useState(initial);

  // Handling Resets
  // useCallback is another built-in Hook
  const reset=useCallback(() => {
    setCount(initial)
  },[initial])
  
  // Return an object
  return {
    count,
    setCount,
    reset  // remember to return this so any component may use it
  };

 /*
  // Better than returning an object: memoizing the returned object
  useMemo is another built-in Hook,
   which helps in performance optimization
   when there are expensive calculations such as recursion

  https://reactjs.org/docs/hooks-reference.html

  "A memoized function "remembers" the results, so subsequent calls with remembered inputs 
  return the remembered result rather than recalculating it"
  https://en.wikipedia.org/wiki/Memoization

  return useMemo(() => ({
    count, 
    setCount 
  }))

  We are not using useMemo in this example because we are using useCallback(fn,deps)
  which is equivalent to useMemo(()=> fn,deps)
  */
}

function App() {
  const { count, setCount, reset } = useCounter(5);

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
        <button onClick={reset}>Reset</button>
      </div>
      <footer>
        <p>Tutorial source: <a href="https://blog.logrocket.com/simplifying-state-initializers-with-react-hooks/">LogRocket blog</a></p>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
