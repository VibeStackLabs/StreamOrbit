export default function parseM3U(text) {
  const lines = text.split("\n");
  let channels = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("#EXTINF")) {
      const name = lines[i].split(",")[1];
      const url = lines[i + 1];

      channels.push({
        name,
        url,
      });
    }
  }

  return channels;
}
