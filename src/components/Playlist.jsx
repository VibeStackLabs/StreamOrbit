import { useEffect, useState } from "react";
import parseM3U from "../utils/parseM3U";
import ChannelCard from "./ChannelCard";
import SearchBar from "./SearchBar";
import PlaylistSource from "./PlaylistSource";
import ChannelSkipper from "./ChannelSkipper";
import { testChannel } from "../utils/channelTester";

export default function Playlist({
  onPlay,
  onFav,
  onSearch,
  channels,
  onChannelsLoaded,
  searchTerm,
}) {
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState(null);
  const [currentSource, setCurrentSource] = useState("");
  const [deadChannels, setDeadChannels] = useState([]);
  const [showDead, setShowDead] = useState(false);

  async function handleSourceChange(type, source, name) {
    try {
      setLoading(true);
      setError(null);
      setDeadChannels([]);

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
      } else if (type === "json-index") {
        parsed = source;
      }

      if (parsed.length === 0) {
        throw new Error("No channels found in playlist");
      }

      const typeDisplay =
        type === "json-index"
          ? "JSON Index"
          : type.charAt(0).toUpperCase() + type.slice(1);
      setCurrentSource(`${typeDisplay}: ${name}`);
      onChannelsLoaded(parsed);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function testAllChannels() {
    setTesting(true);
    const dead = [];
    const total = channels.length;

    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i];
      const isWorking = await testChannel(channel.url);

      if (!isWorking) {
        dead.push(channel.url);
      }

      // Update progress every 10 channels
      if (i % 10 === 0) {
        setTesting(`Testing channels... ${i}/${total}`);
      }
    }

    setDeadChannels(dead);
    setTesting(false);

    // Filter out dead channels
    const workingChannels = channels.filter((ch) => !dead.includes(ch.url));
    onChannelsLoaded(workingChannels);

    alert(`Found ${dead.length} dead channels out of ${total}`);
  }

  async function testCurrentChannel(url) {
    setTesting(true);
    const isWorking = await testChannel(url);
    setTesting(false);

    if (!isWorking) {
      if (
        confirm("This channel appears to be dead. Remove it from the list?")
      ) {
        const updatedChannels = channels.filter((ch) => ch.url !== url);
        onChannelsLoaded(updatedChannels);
        setDeadChannels([...deadChannels, url]);
      }
    } else {
      alert("Channel is working!");
    }
  }

  function toggleDeadChannels() {
    if (showDead) {
      // Show all channels
      onChannelsLoaded(channels);
    } else {
      // Show only dead channels
      const dead = channels.filter((ch) => deadChannels.includes(ch.url));
      onChannelsLoaded(dead);
    }
    setShowDead(!showDead);
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

        <div className="header-tools">
          <ChannelSkipper
            onSkipDeadChannels={testAllChannels}
            onTestSingleChannel={() => {
              if (channels[0]) testCurrentChannel(channels[0].url);
            }}
            isTesting={testing}
          />

          {deadChannels.length > 0 && (
            <button
              className={`dead-toggle ${showDead ? "active" : ""}`}
              onClick={toggleDeadChannels}
            >
              💀 {showDead ? "Show All" : `Show Dead (${deadChannels.length})`}
            </button>
          )}
        </div>

        <PlaylistSource onSourceChange={handleSourceChange} />
      </div>

      <SearchBar value={searchTerm} onChange={onSearch} />

      {testing && (
        <div className="testing-message">
          <div className="spinner"></div>
          <p>{typeof testing === "string" ? testing : "Testing channels..."}</p>
        </div>
      )}

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

      {!loading && !testing && !error && (
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
                {deadChannels.length > 0 && (
                  <span className="dead-count">
                    {" "}
                    ({deadChannels.length} dead)
                  </span>
                )}
              </div>
              <div className="grid">
                {channels.map((ch, i) => (
                  <ChannelCard
                    key={i}
                    channel={ch}
                    onPlay={onPlay}
                    onFav={onFav}
                    isDead={deadChannels.includes(ch.url)}
                    onTest={() => testCurrentChannel(ch.url)}
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
