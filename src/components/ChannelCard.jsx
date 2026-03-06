export default function ChannelCard({ channel, onPlay, onFav }) {
  return (
    <div className="channelCard">
      <div onClick={() => onPlay(channel.url)} className="channelName">
        {channel.name}
      </div>

      <button onClick={() => onFav(channel)}>⭐</button>
    </div>
  );
}
