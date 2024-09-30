import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditing() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  // adjusting palyer name state :
  let playerNameField = <span className="player-name">{playerName}</span>;
  let buttonCaption = "EDIT";

  if (isEditing) {
    playerNameField = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    buttonCaption = "SAVE";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{buttonCaption}</button>
    </li>
  );
}
