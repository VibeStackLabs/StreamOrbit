export default function ChannelCard({ channel, onPlay }) {
  return (
    <div className="channelCard" onClick={() => onPlay(channel.url)}>
      {channel.logo && (
        <img src={channel.logo} alt={channel.name} className="logo" />
      )}

      <div className="channelName">{channel.name}</div>
    </div>
  );
}
