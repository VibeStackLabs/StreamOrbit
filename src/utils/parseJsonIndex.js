import parseM3U from "./parseM3U";

export async function fetchJsonIndex(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch JSON index:", error);
    return [];
  }
}

export async function loadFromJsonIndex(indexUrl, onProgress) {
  const entries = await fetchJsonIndex(indexUrl);
  const allChannels = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    if (onProgress) {
      onProgress({
        current: i + 1,
        total: entries.length,
        title: entry.title,
      });
    }

    if (
      entry.url &&
      (entry.url.endsWith(".m3u") || entry.url.endsWith(".m3u8"))
    ) {
      // Fetch and parse M3U from this URL
      try {
        const response = await fetch(entry.url);
        if (response.ok) {
          const m3uText = await response.text();
          const channels = parseM3U(m3uText);

          // Add source info to each channel
          channels.forEach((ch) => {
            ch.source = entry.title;
            ch.sourceLogo = entry.logo;
            ch.sourceDescription = entry.description;
          });

          allChannels.push(...channels);
        } else {
          console.error(`Failed to load M3U from ${entry.url}`);
        }
      } catch (error) {
        console.error(`Error loading ${entry.url}:`, error);
      }
    } else if (entry.url && entry.url.endsWith(".json")) {
      // Recursively load nested JSON
      const nestedChannels = await loadFromJsonIndex(entry.url);
      allChannels.push(...nestedChannels);
    }
  }

  return allChannels;
}
