import { useState } from "react";

export default function ChannelCard({ channel, onPlay, onFav, isDead }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`channelCard ${isDead ? "dead-channel" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="card-content"
        onClick={() => !isDead && onPlay(channel.url)}
      >
        {channel.logo ? (
          <img
            src={channel.logo}
            alt={channel.name}
            className="logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/60x40?text=TV";
            }}
          />
        ) : (
          <div className="logo-placeholder">📺</div>
        )}
        <div className="channelName">
          {channel.name}
          {isDead && <span className="dead-badge">💀</span>}
        </div>
      </div>

      {isHovered && (
        <div className="card-actions">
          {!isDead && (
            <button
              className="action-button fav-button"
              onClick={(e) => {
                e.stopPropagation();
                onFav(channel);
              }}
              title="Add to favorites"
            >
              ⭐
            </button>
          )}
        </div>
      )}
    </div>
  );
}
