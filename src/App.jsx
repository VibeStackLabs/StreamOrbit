// App.jsx (simplified version)
import { useState, useEffect } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import Favorites from "./components/Favorites";
import AddStream from "./components/AddStream";
import CategoryFilter from "./components/CategoryFilter";
import ChannelNavigator from "./components/ChannelNavigator";
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
  const [currentChannelIndex, setCurrentChannelIndex] = useState(-1);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showFavNotification, setShowFavNotification] = useState(false);

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Keyboard navigation
  useKeyboardNav({
    onNext: () => navigateChannel("next"),
    onPrev: () => navigateChannel("prev"),
    onToggleFav: toggleFavorite,
    onOpenNavigator: () => setShowNavigator(true),
    onPlayPause: togglePlayPause,
    onVolumeUp: () => adjustVolume(0.1),
    onVolumeDown: () => adjustVolume(-0.1),
  });

  function navigateChannel(direction) {
    if (filteredChannels.length === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex = currentChannelIndex + 1;
      if (newIndex >= filteredChannels.length) newIndex = 0;
    } else {
      newIndex = currentChannelIndex - 1;
      if (newIndex < 0) newIndex = filteredChannels.length - 1;
    }

    setCurrentChannelIndex(newIndex);
    setStream(filteredChannels[newIndex].url);
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

  function toggleFavorite() {
    if (currentChannelIndex >= 0) {
      const channel = filteredChannels[currentChannelIndex];
      const isFav = favorites.some((f) => f.url === channel.url);

      if (isFav) {
        setFavorites(favorites.filter((f) => f.url !== channel.url));
      } else {
        setFavorites([...favorites, channel]);
      }

      // Show notification
      setShowFavNotification(true);
      setTimeout(() => setShowFavNotification(false), 2000);
    }
  }

  function togglePlayPause() {
    const player = document.querySelector(".video-js");
    if (player) {
      const videoPlayer = videojs.getPlayer(player.id);
      if (videoPlayer) {
        if (videoPlayer.paused()) {
          videoPlayer.play();
        } else {
          videoPlayer.pause();
        }
      }
    }
  }

  function adjustVolume(delta) {
    const player = document.querySelector(".video-js");
    if (player) {
      const videoPlayer = videojs.getPlayer(player.id);
      if (videoPlayer) {
        const newVolume = Math.max(
          0,
          Math.min(1, videoPlayer.volume() + delta),
        );
        videoPlayer.volume(newVolume);
      }
    }
  }

  function addFav(channel) {
    if (!favorites.find((f) => f.url === channel.url)) {
      setFavorites([...favorites, channel]);
    }
  }

  function removeFav(channelUrl) {
    setFavorites(favorites.filter((f) => f.url !== channelUrl));
  }

  function handlePlay(url) {
    setStream(url);
    const index = filteredChannels.findIndex((ch) => ch.url === url);
    setCurrentChannelIndex(index);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📺 IPTV Player</h1>
        <AddStream onAdd={setStream} />
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <Favorites
            list={favorites}
            onPlay={handlePlay}
            onRemove={removeFav}
          />

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

              {/* Channel info overlay */}
              <div className="channel-info">
                <div className="channel-info-content">
                  <span className="channel-number">
                    CH {currentChannelIndex + 1}
                  </span>
                  <span className="channel-name">
                    {filteredChannels[currentChannelIndex]?.name}
                  </span>
                  <span className="channel-count">
                    {currentChannelIndex + 1}/{filteredChannels.length}
                  </span>
                </div>
              </div>

              {/* Keyboard shortcuts hint */}
              <div className="shortcuts-hint">
                <span>↑↓ Change Channel • F Favorite • G Guide</span>
              </div>
            </div>
          )}

          <Playlist
            onPlay={handlePlay}
            onFav={addFav}
            onSearch={handleSearch}
            channels={filteredChannels}
            onChannelsLoaded={(chs) => {
              setChannels(chs);
              setFilteredChannels(chs);
              const cats = [
                "All",
                ...new Set(chs.map((ch) => ch.category).filter(Boolean)),
              ];
              setCategories(cats);
            }}
            searchTerm={searchTerm}
          />
        </main>
      </div>

      {/* Channel Navigator Modal */}
      {showNavigator && (
        <ChannelNavigator
          channels={filteredChannels}
          currentIndex={currentChannelIndex}
          onChannelChange={(index) => {
            setCurrentChannelIndex(index);
            setStream(filteredChannels[index].url);
          }}
          onClose={() => setShowNavigator(false)}
        />
      )}

      {/* Favorite Notification */}
      {showFavNotification && (
        <div className="notification">
          {favorites.some(
            (f) => f.url === filteredChannels[currentChannelIndex]?.url,
          )
            ? "⭐ Added to favorites"
            : "🗑️ Removed from favorites"}
        </div>
      )}
    </div>
  );
}
