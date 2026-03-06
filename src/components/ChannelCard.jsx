import { useState } from "react";

export default function ChannelCard({ channel, onPlay, onFav }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="channelCard"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content" onClick={() => onPlay(channel.url)}>
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
        <div className="channelName">{channel.name}</div>
      </div>

      {isHovered && (
        <button
          className="fav-button"
          onClick={(e) => {
            e.stopPropagation();
            onFav(channel);
          }}
        >
          ⭐
        </button>
      )}
    </div>
  );
}
