export default function parseM3U(text) {
  const lines = text.split("\n");
  let channels = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("#EXTINF")) {
      const info = lines[i];

      const name = info.split(",")[1];

      const logoMatch = info.match(/tvg-logo="([^"]+)"/);
      const groupMatch = info.match(/group-title="([^"]+)"/);

      const logo = logoMatch ? logoMatch[1] : "";
      const category = groupMatch ? groupMatch[1] : "Other";

      const url = lines[i + 1];

      channels.push({
        name,
        logo,
        category,
        url,
      });
    }
  }

  return channels;
}
