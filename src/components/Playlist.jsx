import { useEffect, useState } from "react";
import parseM3U from "../utils/parseM3U";
import ChannelCard from "./ChannelCard";
import SearchBar from "./SearchBar";
import PlaylistSource from "./PlaylistSource";

export default function Playlist({
  onPlay,
  onFav,
  onSearch,
  channels,
  onChannelsLoaded,
  searchTerm,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSource, setCurrentSource] = useState("");

  async function handleSourceChange(type, source, name) {
    try {
      setLoading(true);
      setError(null);

      let parsed = [];

      if (
        type === "country" ||
        type === "category" ||
        type === "language" ||
        type === "region" ||
        type === "custom"
      ) {
        console.log(`Fetching ${type} playlist:`, source);
        const response = await fetch(source);
        if (!response.ok) throw new Error(`Failed to fetch ${type} playlist`);
        const text = await response.text();
        parsed = parseM3U(text);
      } else if (type === "file") {
        parsed = parseM3U(source);
      }

      if (parsed.length === 0) {
        throw new Error("No channels found in playlist");
      }

      // Capitalize first letter of type for display
      const typeDisplay = type.charAt(0).toUpperCase() + type.slice(1);
      setCurrentSource(`${typeDisplay}: ${name}`);
      onChannelsLoaded(parsed);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="playlist">
      <div className="playlist-header">
        <h2>
          Channel Guide
          {currentSource && (
            <span className="source-name"> - {currentSource}</span>
          )}
        </h2>
        <PlaylistSource onSourceChange={handleSourceChange} />
      </div>

      <SearchBar value={searchTerm} onChange={onSearch} />

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading channels...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>❌ {error}</p>
          <button onClick={() => setError(null)} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {channels.length === 0 ? (
            <div className="no-results">
              <p>No channels loaded. Select a source above to get started!</p>
              <div className="suggestions">
                <small>
                  Try: Country → India, Category → News, or Language → English
                </small>
              </div>
            </div>
          ) : (
            <>
              <div className="channel-count">
                📺 {channels.length} channels available
              </div>
              <div className="grid">
                {channels.map((ch, i) => (
                  <ChannelCard
                    key={i}
                    channel={ch}
                    onPlay={onPlay}
                    onFav={onFav}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
