import { useState, useEffect } from "react";

export default function ChannelNavigator({
  channels,
  currentIndex,
  onChannelChange,
  onClose,
}) {
  const [search, setSearch] = useState("");

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filteredChannels = channels.filter((ch) =>
    ch.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="channel-navigator" onClick={onClose}>
      <div className="navigator-content" onClick={(e) => e.stopPropagation()}>
        <div className="navigator-header">
          <h3>📺 Channel Guide</h3>
          <button className="close-nav" onClick={onClose}>
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Search channels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nav-search"
          autoFocus
        />

        <div className="channel-list">
          {filteredChannels.map((channel, idx) => {
            const originalIndex = channels.findIndex(
              (c) => c.url === channel.url,
            );
            const isCurrent = originalIndex === currentIndex;

            return (
              <div
                key={channel.url}
                className={`nav-channel ${isCurrent ? "current" : ""}`}
                onClick={() => {
                  onChannelChange(originalIndex);
                  onClose();
                }}
              >
                <span className="channel-number">#{originalIndex + 1}</span>
                {channel.logo && (
                  <img src={channel.logo} alt="" className="nav-logo" />
                )}
                <span className="nav-channel-name">{channel.name}</span>
                {isCurrent && <span className="now-indicator">▶ Now</span>}
              </div>
            );
          })}
        </div>

        <div className="navigator-footer">
          <small>↑↓ Navigate • Enter Select • ESC Close</small>
        </div>
      </div>
    </div>
  );
}
