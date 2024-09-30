import { useRef, useState } from "react";

export default function SearchableList({ items, children, itemKeyFn }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // re-rendering the component and derive a new state on
  // every keystroke can quickly be inefficent
  // debouncing => define some timing threshold
  // where we only update the state if the user stopped to
  // type for a few seconds .

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 1000);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange}></input>
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
