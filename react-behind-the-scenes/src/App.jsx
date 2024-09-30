import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import CounterConfigure from "./components/Counter/CounterConfigure.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    // synchronous states updates in the same scope => one execution .
    // this is called STATE BATCHING .
    setChosenCount(newCount);
    setChosenCount((prevChosenCount) => prevChosenCount + 1);
  }

  return (
    <>
      <Header />
      <main>
        <CounterConfigure onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

// if you have a component function that has a state
// every component instance of it will have its state scoped
// to it .

export default App;
