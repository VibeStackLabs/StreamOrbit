import { useState } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import AddStream from "./components/AddStream";

export default function App() {
  const [stream, setStream] = useState("");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#111",
        color: "white",
      }}
    >
      <div
        style={{
          width: "300px",
          borderRight: "1px solid #333",
        }}
      >
        <AddStream onAdd={setStream} />

        <Playlist onSelect={setStream} />
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Player stream={stream} />
      </div>
    </div>
  );
}
