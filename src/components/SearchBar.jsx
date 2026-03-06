import { useState, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="search-container">
      <input
        className="search-bar"
        type="text"
        placeholder="🔍 Search channels..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      {localValue && (
        <button className="clear-search" onClick={() => setLocalValue("")}>
          ✕
        </button>
      )}
    </div>
  );
}
