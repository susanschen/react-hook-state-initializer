import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useMemo } from "react"  if you are using this built-in hook
import ReactDOM from "react-dom";

import "./styles.css";

/* Custum Hook */
// Configure custom hook to an initial state instead of hardcoding it. 
// Set a default value of 1 if no value is passed to parameter
function useCounter(initial=1) {
  const [count, setCount] = useState(initial);
  const resetRef = useRef(0);  // holds the number of resets that have been triggered

  // Handling Resets
  // useCallback is another built-in Hook
  const reset=useCallback(() => {
    setCount(initial);
    // update the reset ref count and store it in the '.current' property of useRef Hook
    ++resetRef.current;  
  },[initial])
  
  console.log(resetRef.current)
  // Return an object
  return {
    count,
    setCount,
    reset, // allow any consumer to use the reset fn
    resetDep: resetRef.current // expose the reset count as a reset dependency
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
  const { count, setCount, reset, resetDep } = useCounter(5);
  /*
  NOT RECOMMENDED: 
  i.e. let componentJustMounted = true;
  Assignments to variable from inside React Hook useEffect will be lost after each render. 

  RECOMMENDED: 
  To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property.
  */
  const componentJustMounted = useRef(true);

  /* 
  this useEffect only runs when the reset count has changed
  */
  useEffect(()=> {
    /*
    Since this useEffect runs when App mounts (reset count initialized to 0),
     we use our custom variable componentJustMounted.current to skip the side effect when App mounts
    */
    if(!componentJustMounted.current) {
      console.log("Perform side effect");
    } 
    else console.log('Just mounted.')
    // After mounted
    componentJustMounted.current = false;  
  }, [resetDep]) 

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
