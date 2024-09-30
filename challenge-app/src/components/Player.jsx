import { useState, useRef } from "react";
// all hooks functions must be called inside a componenet or a custom hook .

export default function Player() {
  const [playerName, setPlayerName] = useState("unkown entity");

  const playerNameInput = useRef();

  // whenever a ref changes , the component does not re-execute .
  // where state values do cause the componenet to re-execute .

  // state => for values directly reflected in the UI , and NOT used for other values .
  // refs => direct dom access .
  function handleClick() {
    const name = playerNameInput.current.value;
    setPlayerName(name);
    playerNameInput.current.value = ""; // manipulating the DOM through Refs .
  }

  return (
    <section id="player">
      <h2>Welcome {playerName}</h2>
      <p>
        <input ref={playerNameInput} type="text"></input>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
