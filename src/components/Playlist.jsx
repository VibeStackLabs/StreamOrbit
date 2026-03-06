import { useEffect, useState } from "react";

export default function Playlist({ onSelect }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch("https://iptv-org.github.io/iptv/countries/in.m3u")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n");
        let list = [];

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith("#EXTINF")) {
            const name = lines[i].split(",")[1];
            const url = lines[i + 1];

            list.push({
              name,
              url,
            });
          }
        }

        setChannels(list);
      });
  }, []);

  return (
    <div style={{ overflow: "auto", height: "100%" }}>
      {channels.map((ch, i) => (
        <div
          key={i}
          onClick={() => onSelect(ch.url)}
          style={{
            padding: "8px",
            cursor: "pointer",
            borderBottom: "1px solid #333",
          }}
        >
          {ch.name}
        </div>
      ))}
    </div>
  );
}
