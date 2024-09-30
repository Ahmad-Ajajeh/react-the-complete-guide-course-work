export default function UserInput({ label, handleClick }) {
  return (
    <span id="user-input">
      <label>{label}</label>
      <input onChange={handleClick}></input>
    </span>
  );
}
