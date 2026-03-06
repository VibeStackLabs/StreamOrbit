import { useEffect, useState } from "react";
import parseM3U from "../utils/parseM3U";
import ChannelCard from "./ChannelCard";
import SearchBar from "./SearchBar";

export default function Playlist({
  onPlay,
  onFav,
  onSearch,
  channels,
  onChannelsLoaded,
  searchTerm,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChannels();
  }, []);

  async function fetchChannels() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://iptv-org.github.io/iptv/countries/in.m3u",
      );
      const text = await response.text();
      const parsed = parseM3U(text);
      onChannelsLoaded(parsed);
      setError(null);
    } catch (err) {
      setError("Failed to load channels");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading channels...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="playlist">
      <SearchBar value={searchTerm} onChange={onSearch} />

      {channels.length === 0 ? (
        <div className="no-results">No channels found</div>
      ) : (
        <div className="grid">
          {channels.map((ch, i) => (
            <ChannelCard key={i} channel={ch} onPlay={onPlay} onFav={onFav} />
          ))}
        </div>
      )}
    </div>
  );
}
