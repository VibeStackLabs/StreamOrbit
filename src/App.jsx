import { useState, useEffect } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import Favorites from "./components/Favorites";
import AddStream from "./components/AddStream";
import CategoryFilter from "./components/CategoryFilter";
import useKeyboardNav from "./hooks/useKeyboardNav";
import "./App.css";

export default function App() {
  const [stream, setStream] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Keyboard navigation
  useKeyboardNav({
    onNext: () => navigateChannels("next"),
    onPrev: () => navigateChannels("prev"),
    onToggleFav: () => setShowFavorites(!showFavorites),
  });

  function navigateChannels(direction) {
    // This will be implemented to navigate through channels
    console.log("Navigate", direction);
  }

  function addFav(channel) {
    if (!favorites.find((f) => f.url === channel.url)) {
      setFavorites([...favorites, channel]);
    }
  }

  function removeFav(channelUrl) {
    setFavorites(favorites.filter((f) => f.url !== channelUrl));
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    filterChannels(category, searchTerm);
  }

  function handleSearch(term) {
    setSearchTerm(term);
    filterChannels(selectedCategory, term);
  }

  function filterChannels(category, search) {
    let result = channels;

    if (category !== "All") {
      result = result.filter((ch) => ch.category === category);
    }

    if (search) {
      result = result.filter((ch) =>
        ch.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredChannels(result);
  }

  function handleChannelsLoaded(loadedChannels) {
    setChannels(loadedChannels);
    setFilteredChannels(loadedChannels);

    // Extract unique categories
    const cats = [
      "All",
      ...new Set(loadedChannels.map((ch) => ch.category).filter(Boolean)),
    ];
    setCategories(cats);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📺 IPTV Player</h1>
        <AddStream onAdd={setStream} />
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <Favorites list={favorites} onPlay={setStream} onRemove={removeFav} />

          <CategoryFilter
            categories={categories}
            current={selectedCategory}
            onChange={handleCategoryChange}
          />
        </aside>

        <main className="content">
          {stream && (
            <div className="player-container">
              <Player stream={stream} />
            </div>
          )}

          <Playlist
            onPlay={setStream}
            onFav={addFav}
            onSearch={handleSearch}
            channels={filteredChannels}
            onChannelsLoaded={handleChannelsLoaded}
            searchTerm={searchTerm}
          />
        </main>
      </div>
    </div>
  );
}
