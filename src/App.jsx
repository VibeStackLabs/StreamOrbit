import { useState, useEffect } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import Favorites from "./components/Favorites";
import AddStream from "./components/AddStream";

export default function App() {
  const [stream, setStream] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");

    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  function addFav(channel) {
    const updated = [...favorites, channel];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  return (
    <div className="layout">
      <div className="sidebar">
        <AddStream onAdd={setStream} />

        <Favorites list={favorites} onPlay={setStream} />
      </div>

      <div className="content">
        <Player stream={stream} />

        <Playlist onPlay={setStream} onFav={addFav} />
      </div>
    </div>
  );
}
