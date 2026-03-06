import ChannelCard from "./ChannelCard";

export default function ChannelGrid({ channels, onPlay }) {
  return (
    <div className="grid">
      {channels.map((ch, i) => (
        <ChannelCard key={i} channel={ch} onPlay={onPlay} />
      ))}
    </div>
  );
}
