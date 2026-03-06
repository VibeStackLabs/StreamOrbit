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
  const [currentSource, setCurrentSource] = useState("India");

  async function handleSourceChange(type, source, name) {
    try {
      setLoading(true);
      setError(null);

      let parsed = [];

      if (type === "country" || type === "custom") {
        const response = await fetch(source);
        if (!response.ok) throw new Error("Failed to fetch playlist");
        const text = await response.text();
        parsed = parseM3U(text);
      } else if (type === "file") {
        parsed = parseM3U(source);
      }

      if (parsed.length === 0) {
        throw new Error("No channels found in playlist");
      }

      setCurrentSource(name || source);
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
          Channels{" "}
          {currentSource && (
            <span className="source-name">- {currentSource}</span>
          )}
        </h2>
        <PlaylistSource onSourceChange={handleSourceChange} />
      </div>

      <SearchBar value={searchTerm} onChange={onSearch} />

      {loading && <div className="loading">Loading channels...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          {channels.length === 0 ? (
            <div className="no-results">
              No channels loaded. Select a country or add a custom playlist.
            </div>
          ) : (
            <>
              <div className="channel-count">{channels.length} channels</div>
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
