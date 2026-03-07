import { useState } from "react";

export default function AddStream({ onAdd }) {
  const [url, setUrl] = useState("");

  function add() {
    if (!url) return;

    onAdd(url);
    setUrl("");
  }

  return (
    <div className="add-stream">
      <input
        placeholder="Paste stream url (.m3u8)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "80%" }}
      />

      <button onClick={add}>Add</button>
    </div>
  );
}
