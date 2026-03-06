import { useEffect, useState } from "react";
import parseM3U from "../utils/parseM3U";
import ChannelCard from "./ChannelCard";
import SearchBar from "./SearchBar";

export default function Playlist({ onPlay, onFav }) {
  const [channels, setChannels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://iptv-org.github.io/iptv/countries/in.m3u")
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseM3U(text);
        setChannels(parsed);
      });
  }, []);

  const filtered = channels.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid">
        {filtered.map((ch, i) => (
          <ChannelCard key={i} channel={ch} onPlay={onPlay} onFav={onFav} />
        ))}
      </div>
    </div>
  );
}
